import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Resolve classes.json path
const candidatePaths = [
  path.join(process.cwd(), "src", "data", "classes.json"),
  path.join(process.cwd(), "data", "classes.json"),
  path.join(process.cwd(), "..", "src", "data", "classes.json"),
];
let classesFile =
  candidatePaths.find((p) => fs.existsSync(p)) || candidatePaths[0];

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params for Next.js 15 compatibility
    const params = await context.params;
    const classId = params.id;
    console.log("[API DELETE] Deleting class with id:", classId);

    if (!fs.existsSync(classesFile)) {
      console.error("[API DELETE] File not found:", classesFile);
      return NextResponse.json(
        { ok: false, error: "classes.json not found", details: `File path: ${classesFile}` },
        { status: 404 }
      );
    }

    // Read current data
    const raw = fs.readFileSync(classesFile, "utf-8");
    let data: any[] = [];
    
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error("[API DELETE] Parse error:", err);
      return NextResponse.json(
        { ok: false, error: "classes.json is not valid JSON", details: err instanceof Error ? err.message : String(err) },
        { status: 500 }
      );
    }

    if (!Array.isArray(data)) {
      console.error("[API DELETE] Data is not array:", typeof data);
      return NextResponse.json(
        { ok: false, error: "classes.json must be an array" },
        { status: 500 }
      );
    }

    // Filter out the class to delete
    const originalLength = data.length;
    const filteredData = data.filter((c: any) => {
      const id = String(c.id || c.class_id || "");
      return id !== classId;
    });

    console.log("[API DELETE] Original length:", originalLength, "Filtered length:", filteredData.length);

    if (filteredData.length === originalLength) {
      console.error("[API DELETE] Class not found with id:", classId);
      return NextResponse.json(
        { ok: false, error: "Class not found", details: `No class with id: ${classId}` },
        { status: 404 }
      );
    }

    // Write back to file
    try {
      const dir = path.dirname(classesFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const tmpFile = path.join(dir, `classes.${Date.now()}.tmp.json`);
      fs.writeFileSync(tmpFile, JSON.stringify(filteredData, null, 2), {
        mode: 0o666,
      });
      fs.renameSync(tmpFile, classesFile);

      console.log("[API DELETE] Successfully deleted class:", classId);
      return NextResponse.json({
        ok: true,
        message: "Class deleted successfully",
        data: filteredData,
      });
    } catch (writeErr) {
      console.error("[API DELETE] Write error:", writeErr);
      
      // Attempt chmod and retry
      try {
        fs.chmodSync(classesFile, 0o666);
        const tmpFile = path.join(path.dirname(classesFile), `classes.${Date.now()}.tmp.json`);
        fs.writeFileSync(tmpFile, JSON.stringify(filteredData, null, 2), {
          mode: 0o666,
        });
        fs.renameSync(tmpFile, classesFile);

        console.log("[API DELETE] Successfully deleted class after chmod:", classId);
        return NextResponse.json({
          ok: true,
          message: "Class deleted successfully (after chmod)",
          data: filteredData,
        });
      } catch (retryErr) {
        console.error("[API DELETE] Retry failed:", retryErr);
        return NextResponse.json(
          {
            ok: false,
            error: "Failed to write changes to file",
            details: retryErr instanceof Error ? retryErr.message : String(retryErr),
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("[API DELETE] Unexpected error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to delete class",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
