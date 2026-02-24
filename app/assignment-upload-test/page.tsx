"use client";

import { useState, useEffect } from "react";
import IDE from "@/components/assignment/IDE";

/**
 * Test page to demonstrate the upload system
 * Navigate to /assignment-upload-test to view
 */
export default function UploadTestPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all submissions
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/assignments/upload');
      const result = await response.json();
      if (result.success) {
        setSubmissions(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Read file content for preview
  const handleFilePreview = async (filePath: string, fileName: string) => {
    try {
      const response = await fetch(filePath);
      const content = await response.text();
      setSelectedFile({
        type: 'file',
        name: fileName,
        path: filePath,
        content: content
      });
    } catch (error) {
      console.error('Failed to read file:', error);
      alert('Could not preview file');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            📤 Upload System Test & Demo
          </h1>
          <p className="text-slate-600">
            Test the assignment upload functionality and view submissions
          </p>
        </div>

        {/* Test Links */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Links</h2>
          <div className="flex gap-4">
            <a
              href="/assignment/test-assignment"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Assignment Page
            </a>
            <button
              onClick={fetchSubmissions}
              disabled={loading}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-300"
            >
              {loading ? 'Refreshing...' : 'Refresh Submissions'}
            </button>
            <a
              href="/UPLOAD_SYSTEM_README.md"
              target="_blank"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              📚 View Documentation
            </a>
          </div>
        </div>

        {/* Submissions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Submissions */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              All Submissions ({submissions.length})
            </h2>
            
            {loading && (
              <div className="text-center py-8 text-slate-500">
                Loading submissions...
              </div>
            )}

            {!loading && submissions.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                No submissions yet. Go to the assignment page to upload files.
              </div>
            )}

            <div className="space-y-4">
              {submissions.map((submission, idx) => (
                <div
                  key={submission.id || idx}
                  className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">
                      Submission #{submission.id}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      submission.type === 'file' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {submission.type}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-600">Assignment:</span>
                      <span className="ml-2 font-medium">{submission.assignmentId}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">User:</span>
                      <span className="ml-2 font-medium">{submission.userId}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Submitted:</span>
                      <span className="ml-2">{new Date(submission.submittedAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Files */}
                  {submission.files && submission.files.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-xs font-semibold text-slate-700 mb-2">
                        FILES ({submission.files.length})
                      </p>
                      <div className="space-y-1">
                        {submission.files.map((file: any, fileIdx: number) => (
                          <button
                            key={fileIdx}
                            onClick={() => handleFilePreview(file.path, file.name)}
                            className="w-full text-left px-2 py-1 rounded hover:bg-blue-50 text-sm text-blue-600 hover:underline"
                          >
                            📄 {file.name} ({typeof file.size === 'number' ? `${(file.size / 1024).toFixed(1)} KB` : file.size})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  {submission.links && submission.links.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-xs font-semibold text-slate-700 mb-2">
                        LINKS ({submission.links.length})
                      </p>
                      <div className="space-y-1">
                        {submission.links.map((link: any, linkIdx: number) => (
                          <a
                            key={linkIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-2 py-1 rounded hover:bg-green-50 text-sm text-green-600 hover:underline"
                          >
                            🔗 {link.url}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: File Preview */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              File Preview
            </h2>

            {!selectedFile && (
              <div className="text-center py-16 text-slate-500">
                Click on a file to preview it here
              </div>
            )}

            {selectedFile && (
              <div style={{ height: '600px' }}>
                <IDE
                  file={selectedFile}
                  readOnly={true}
                />
              </div>
            )}
          </div>
        </div>

        {/* Data Files Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-3">
            📁 Data Storage Locations
          </h2>
          <div className="space-y-2 text-sm text-blue-800">
            <div>
              <span className="font-semibold">Submissions JSON:</span>
              <code className="ml-2 bg-blue-100 px-2 py-1 rounded">data/submissions.json</code>
            </div>
            <div>
              <span className="font-semibold">IDE Mock JSON:</span>
              <code className="ml-2 bg-blue-100 px-2 py-1 rounded">data/ideMock.json</code>
            </div>
            <div>
              <span className="font-semibold">Uploaded Files:</span>
              <code className="ml-2 bg-blue-100 px-2 py-1 rounded">public/uploads/[assignmentId]/</code>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-slate-100 border border-slate-300 rounded-lg p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            📝 How to Test
          </h2>
          <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
            <li>Click "Go to Assignment Page" to navigate to the assignment</li>
            <li>Toggle between "📁 Upload Files/ZIP" and "🔗 Add Link"</li>
            <li>Upload some files (.py, .js, .zip, etc.)</li>
            <li>Add a GitHub or Google Drive link</li>
            <li>Come back here and click "Refresh Submissions"</li>
            <li>Click on any file to preview it in the IDE component</li>
            <li>Check the data files in the file explorer to see stored JSON</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
