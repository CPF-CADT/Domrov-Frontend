import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Resolve classes.json path depending on working directory (projects may run with cwd at project root or /src)
const candidatePaths = [
  path.join(process.cwd(), "src", "data", "classes.json"),
  path.join(process.cwd(), "data", "classes.json"),
  path.join(process.cwd(), "..", "src", "data", "classes.json"),
];
let classesFile =
  candidatePaths.find((p) => fs.existsSync(p)) || candidatePaths[0];
console.log("[API INIT] classesFile resolved to", classesFile);

// Volatile in-memory fallback storage when file writes fail (development demo only)
let volatileClasses: any[] = [];

export async function GET() {
  // Return combined classes (persisted + volatile) and diagnostic info
  try {
    console.log(
      "[API GET] classesFile path:",
      classesFile,
      "exists:",
      fs.existsSync(classesFile),
    );
    let fileData: any[] = [];
    if (fs.existsSync(classesFile)) {
      const raw = fs.readFileSync(classesFile, "utf-8");
      try {
        fileData = JSON.parse(raw);
      } catch (err) {
        console.error("classes.json parse error in GET:", err);
        return NextResponse.json(
          { ok: false, error: "classes.json is invalid JSON" },
          { status: 500 },
        );
      }
      if (!Array.isArray(fileData)) {
        console.error("classes.json is not an array");
        return NextResponse.json(
          { ok: false, error: "classes.json must be an array" },
          { status: 500 },
        );
      }
    }

    const raw = fs.existsSync(classesFile)
      ? fs.readFileSync(classesFile, "utf-8")
      : null;
    const combined = [...fileData, ...volatileClasses];
    const stat = fs.existsSync(classesFile) ? fs.statSync(classesFile) : null;
    console.log("[API GET] cwd:", process.cwd());
    console.log("[API GET] returning", {
      persistedCount: fileData.length,
      volatileCount: volatileClasses.length,
    });
    return NextResponse.json({
      ok: true,
      data: combined,
      stat,
      volatileCount: volatileClasses.length,
      rawPreview: raw ? raw.slice(0, 1000) : null,
      cwd: process.cwd(),
    });
  } catch (error) {
    console.error("Diagnostic error in /api/classes GET:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const newClass = await req.json();
    let data: any[] = [];
    if (fs.existsSync(classesFile)) {
      const raw = fs.readFileSync(classesFile, "utf-8");
      try {
        data = JSON.parse(raw);
      } catch (err) {
        throw new Error("classes.json is not valid JSON");
      }
      if (!Array.isArray(data))
        throw new Error("classes.json must be an array");
      data.push(newClass);
    } else {
      data = [newClass];
    }

    // Attempt atomic write to a temp file then rename for safety
    try {
      // write atomically into same directory as classesFile
      const dir = path.dirname(classesFile);
      try {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      } catch (e) {
        console.error("Failed to ensure dir exists:", dir, e);
      }
      const tmpFile = path.join(dir, `classes.${Date.now()}.tmp.json`);
      console.log("[API POST] attempting atomic write to tmpFile:", tmpFile);
      fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), { mode: 0o666 });
      fs.renameSync(tmpFile, classesFile);
      // return combined dataset      // cleanup volatile entries that are now persisted
      const persistedKeys = new Set(
        (data || []).map(
          (it: any) => it.id ?? it.class_id ?? JSON.stringify(it),
        ),
      );
      volatileClasses = volatileClasses.filter((vc) => {
        const key = vc.id ?? vc.class_id ?? JSON.stringify(vc);
        return !persistedKeys.has(String(key));
      }); // return deduplicated combined dataset
      const rawCombined = [...data, ...volatileClasses];
      const combined = [] as any[];
      const seen = new Set<string>();
      for (const it of rawCombined) {
        const key = it.id ?? it.class_id ?? JSON.stringify(it);
        if (!seen.has(String(key))) {
          seen.add(String(key));
          combined.push(it);
        }
      }
      return NextResponse.json({
        success: true,
        persisted: true,
        data: combined,
      });
    } catch (err) {
      console.error("Write failed (atomic), attempting chmod and retry:", err);
      // attempt to make file writable then retry
      try {
        if (fs.existsSync(classesFile)) {
          fs.chmodSync(classesFile, 0o666);
          // write atomically into same directory as classesFile (retry path)
          const dir = path.dirname(classesFile);
          try {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          } catch (e) {
            console.error("Retry: failed to ensure dir exists:", dir, e);
          }
          const tmpFile = path.join(dir, `classes.${Date.now()}.tmp.json`);
          console.log(
            "[API POST] retry attempting atomic write to tmpFile:",
            tmpFile,
          );
          fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), {
            mode: 0o666,
          });
          fs.renameSync(tmpFile, classesFile);
          // cleanup volatile entries that are now persisted
          const persistedKeys = new Set(
            (data || []).map(
              (it: any) => it.id ?? it.class_id ?? JSON.stringify(it),
            ),
          );
          volatileClasses = volatileClasses.filter((vc) => {
            const key = vc.id ?? vc.class_id ?? JSON.stringify(vc);
            return !persistedKeys.has(String(key));
          });
          const rawCombined = [...data, ...volatileClasses];
          const combined = [] as any[];
          const seen = new Set<string>();
          for (const it of rawCombined) {
            const key = it.id ?? it.class_id ?? JSON.stringify(it);
            if (!seen.has(String(key))) {
              seen.add(String(key));
              combined.push(it);
            }
          }
          return NextResponse.json({
            success: true,
            persisted: true,
            chmod: true,
            data: combined,
          });
        }
      } catch (err2) {
        console.error("Retry after chmod failed:", err2);
      }

      // final fallback to volatile memory
      volatileClasses.push(newClass);
      const rawCombined = [...data, ...volatileClasses];
      const combined = [] as any[];
      const seen = new Set<string>();
      for (const it of rawCombined) {
        const key = it.id ?? it.class_id ?? JSON.stringify(it);
        if (!seen.has(String(key))) {
          seen.add(String(key));
          combined.push(it);
        }
      }
      return NextResponse.json({
        success: true,
        volatile: true,
        data: combined,
        message: "Saved in memory fallback",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  } catch (error) {
    console.error("API error in /api/classes POST:", error);
    return NextResponse.json(
      {
        error: "Failed to write class data.",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
