import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const uploadType = formData.get('uploadType') as string;
    const assignmentId = formData.get('assignmentId') as string;
    const userId = formData.get('userId') as string;

    if (!assignmentId || !userId) {
      return NextResponse.json(
        { success: false, message: 'Missing assignment or user ID' },
        { status: 400 }
      );
    }

    let submissionData: any = {
      id: Date.now().toString(),
      assignmentId,
      userId,
      submittedAt: new Date().toISOString(),
      type: uploadType,
      files: [],
      links: []
    };

    if (uploadType === 'file') {
      // Handle file uploads (ZIP or individual files)
      const files = formData.getAll('files') as File[];
      
      if (!files || files.length === 0) {
        return NextResponse.json(
          { success: false, message: 'No files provided' },
          { status: 400 }
        );
      }

      const uploadDir = path.join(process.cwd(), 'public', 'uploads', assignmentId);
      
      // Create directory if it doesn't exist
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      // Save each file
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const fileName = `${userId}_${Date.now()}_${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        
        await writeFile(filePath, buffer);
        
        submissionData.files.push({
          name: file.name,
          size: file.size,
          path: `/uploads/${assignmentId}/${fileName}`,
          uploadedAt: new Date().toISOString()
        });
      }
    } else if (uploadType === 'link') {
      // Handle link uploads (GitHub, Google Drive, etc.)
      const links = formData.getAll('links') as string[];
      
      if (!links || links.length === 0) {
        return NextResponse.json(
          { success: false, message: 'No links provided' },
          { status: 400 }
        );
      }

      submissionData.links = links.map(link => ({
        url: link,
        addedAt: new Date().toISOString()
      }));
    }

    // Save to submissions.json
    const submissionsPath = path.join(process.cwd(), 'data', 'submissions.json');
    let submissions = [];
    
    try {
      const data = await readFile(submissionsPath, 'utf-8');
      submissions = JSON.parse(data);
    } catch (error) {
      submissions = [];
    }

    submissions.push(submissionData);
    await writeFile(submissionsPath, JSON.stringify(submissions, null, 2));

    // Save to ideMock.json
    const ideMockPath = path.join(process.cwd(), 'data', 'ideMock.json');
    let ideMockData: any = { submissions: [] };
    
    try {
      const data = await readFile(ideMockPath, 'utf-8');
      ideMockData = JSON.parse(data);
    } catch (error) {
      ideMockData = { submissions: [] };
    }

    // Add IDE-specific mock data
    ideMockData.submissions.push({
      ...submissionData,
      codeFiles: submissionData.files.filter((f: any) => 
        f.name.endsWith('.py') || 
        f.name.endsWith('.js') || 
        f.name.endsWith('.jsx') || 
        f.name.endsWith('.ts') || 
        f.name.endsWith('.tsx') ||
        f.name.endsWith('.java') ||
        f.name.endsWith('.cpp') ||
        f.name.endsWith('.c')
      ).map((f: any) => ({
        ...f,
        type: 'file',
        content: '', // Will be loaded when needed
        feedback: {}
      })),
      status: 'submitted',
      score: null,
      feedback: {}
    });

    await writeFile(ideMockPath, JSON.stringify(ideMockData, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Submission uploaded successfully',
      data: submissionData
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Upload failed', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const assignmentId = searchParams.get('assignmentId');
    const userId = searchParams.get('userId');

    const submissionsPath = path.join(process.cwd(), 'data', 'submissions.json');
    
    let submissions = [];
    try {
      const data = await readFile(submissionsPath, 'utf-8');
      submissions = JSON.parse(data);
    } catch (error) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Filter submissions
    let filtered = submissions;
    if (assignmentId) {
      filtered = filtered.filter((s: any) => s.assignmentId === assignmentId);
    }
    if (userId) {
      filtered = filtered.filter((s: any) => s.userId === userId);
    }

    return NextResponse.json({ success: true, data: filtered });

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
