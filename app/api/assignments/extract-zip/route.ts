import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import AdmZip from 'adm-zip';

export async function POST(request: NextRequest) {
  try {
    const { filePath } = await request.json();
    
    if (!filePath) {
      return NextResponse.json(
        { success: false, message: 'File path is required' },
        { status: 400 }
      );
    }

    const fullPath = path.join(process.cwd(), 'public', filePath);
    
    // Read the ZIP file
    const zip = new AdmZip(fullPath);
    const zipEntries = zip.getEntries();
    
    const files: any[] = [];
    
    zipEntries.forEach((entry) => {
      if (!entry.isDirectory) {
        const content = entry.getData().toString('utf8');
        files.push({
          name: entry.entryName,
          path: entry.entryName,
          content: content,
          size: entry.header.size,
          type: 'file'
        });
      }
    });
    
    return NextResponse.json({
      success: true,
      files: files
    });

  } catch (error) {
    console.error('ZIP extraction error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to extract ZIP file', error: String(error) },
      { status: 500 }
    );
  }
}
