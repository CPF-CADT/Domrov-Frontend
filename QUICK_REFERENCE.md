# 🚀 Quick Reference - Upload System

## 📍 Pages

| Page | URL | Purpose |
|------|-----|---------|
| Assignment | `/assignment/[id]` | Upload files & links |
| Test Dashboard | `/assignment-upload-test` | View all submissions & test |

## 🔧 API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/assignments/upload` | POST | Upload files or links |
| `/api/assignments/upload?assignmentId=X&userId=Y` | GET | Get submissions |

## 📁 Key Files

### New Files
- `app/api/assignments/upload/route.ts` - Upload API
- `components/assignment/IDE.tsx` - Code viewer
- `app/assignment-upload-test/page.tsx` - Test page
- `data/submissions.json` - Submission data
- `data/ideMock.json` - IDE mock data
- `public/uploads/` - File storage

### Updated Files
- `components/assignment/UploadSection.tsx` - Upload UI
- `components/assignment/StudentPortal.tsx` - Portal wrapper
- `app/assignment/[id]/page.tsx` - Assignment page

## 💻 Usage Examples

### Upload a File
```typescript
const formData = new FormData();
formData.append('uploadType', 'file');
formData.append('assignmentId', 'test-1');
formData.append('userId', '1');
formData.append('files', fileObject);

const res = await fetch('/api/assignments/upload', {
  method: 'POST',
  body: formData
});
```

### Upload a Link
```typescript
const formData = new FormData();
formData.append('uploadType', 'link');
formData.append('assignmentId', 'test-1');
formData.append('userId', '1');
formData.append('links', 'https://github.com/user/repo');

const res = await fetch('/api/assignments/upload', {
  method: 'POST',
  body: formData
});
```

### Get Submissions
```typescript
const res = await fetch('/api/assignments/upload?assignmentId=test-1');
const data = await res.json();
console.log(data.data); // Array of submissions
```

## 🎨 Component Props

### UploadSection
```typescript
<UploadSection
  uploadedFiles={files}
  onFilesAdded={(newFiles) => setFiles([...files, ...newFiles])}
  onFileRemoved={(index) => setFiles(files.filter((_, i) => i !== index))}
  assignmentId="test-1"
  userId="1"
  onUploadComplete={(data) => console.log('Done!', data)}
/>
```

### IDE
```typescript
<IDE
  file={{
    type: 'file',
    name: 'solution.py',
    path: '/uploads/test-1/solution.py',
    content: 'print("Hello World")'
  }}
  readOnly={true}
/>
```

## 🗂️ Data Structure

### submissions.json
```json
[
  {
    "id": "1234567890",
    "assignmentId": "test-1",
    "userId": "1",
    "submittedAt": "2026-02-24T...",
    "type": "file",
    "files": [
      {
        "name": "solution.py",
        "size": 12345,
        "path": "/uploads/test-1/1_timestamp_solution.py",
        "uploadedAt": "2026-02-24T..."
      }
    ],
    "links": []
  }
]
```

### ideMock.json
```json
{
  "submissions": [
    {
      "id": "1234567890",
      "codeFiles": [
        {
          "name": "solution.py",
          "type": "file",
          "content": "",
          "feedback": {}
        }
      ],
      "status": "submitted",
      "score": null
    }
  ]
}
```

## 📋 Testing Steps

1. ✅ Start dev server: `npm run dev`
2. ✅ Go to: `http://localhost:3000/assignment/test-assignment`
3. ✅ Upload a file (drag & drop or browse)
4. ✅ Upload a link (GitHub URL)
5. ✅ Check: `public/uploads/test-assignment/`
6. ✅ Check: `data/submissions.json`
7. ✅ Go to: `http://localhost:3000/assignment-upload-test`
8. ✅ View submissions and preview files

## 🎯 Supported File Types

### Code Files (with syntax highlighting)
- `.py` - Python
- `.js`, `.jsx` - JavaScript
- `.ts`, `.tsx` - TypeScript
- `.java` - Java
- `.cpp`, `.c`, `.h` - C/C++
- `.cs` - C#
- `.html`, `.css` - Web
- `.json`, `.xml`, `.yaml` - Data

### Other Files
- `.zip` - Compressed archives
- `.pdf` - Documents
- `.docx` - Word documents

## 🔗 Link Types Supported

- GitHub repositories
- Google Drive files/folders
- Dropbox links
- OneDrive links
- Any public URL

## 📦 File Storage

Files are saved to:
```
public/uploads/[assignmentId]/[userId]_[timestamp]_[filename]

Example:
public/uploads/test-assignment/1_1708800000000_solution.py
```

## ⚡ Quick Commands

```bash
# Install dependencies (already done)
npm install @monaco-editor/react

# Start dev server
npm run dev

# View test page
# http://localhost:3000/assignment-upload-test

# View assignment page
# http://localhost:3000/assignment/test-assignment
```

## 📖 Full Documentation

See `UPLOAD_SYSTEM_README.md` for complete documentation.
See `IMPLEMENTATION_SUMMARY.md` for implementation details.

---

**Ready to use!** 🎉
