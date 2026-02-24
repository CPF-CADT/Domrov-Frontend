# Assignment Upload System - Implementation Guide

## 📋 Overview

This implementation provides a complete assignment upload system with the following features:

1. **File Upload** - Upload ZIP files or individual code files to the `public/uploads` folder
2. **Link Upload** - Add GitHub repositories, Google Drive, Dropbox, or other links
3. **Mock Data Storage** - Saves submission data in JSON files for easy testing
4. **IDE Integration** - Code viewer component for displaying uploaded files

## 🗂️ File Structure

```
Domrov-Frontend/
├── app/
│   ├── assignment/
│   │   └── [id]/
│   │       └── page.tsx                    # Assignment detail page
│   └── api/
│       └── assignments/
│           └── upload/
│               └── route.ts                # Upload API endpoint
├── components/
│   └── assignment/
│       ├── UploadSection.tsx               # Upload UI component (updated)
│       ├── StudentPortal.tsx               # Portal wrapper (updated)
│       └── IDE.tsx                         # Code viewer component (new)
├── data/
│   ├── submissions.json                    # All submissions
│   ├── ideMock.json                       # IDE-specific mock data
│   └── mockData.ts                         # Existing mock data
└── public/
    └── uploads/                            # Uploaded files stored here
        └── [assignmentId]/                 # Organized by assignment
            └── [userId]_[timestamp]_[filename]
```

## 🚀 Features Implemented

### 1. Upload Section Component (`UploadSection.tsx`)

**Features:**
- Toggle between file upload and link upload modes
- Drag & drop file upload
- File browser upload
- Link input with validation
- Real-time upload status
- File type icons (files vs links)
- Clickable links for GitHub/Drive URLs
- File removal functionality

**Props:**
```typescript
interface UploadSectionProps {
  uploadedFiles: UploadedFile[];
  onFilesAdded: (files: UploadedFile[]) => void;
  onFileRemoved: (index: number) => void;
  assignmentId?: string;        // For organizing uploads
  userId?: string;              // For tracking submitters
  onUploadComplete?: (data: any) => void;  // Callback after upload
}
```

### 2. Upload API (`/api/assignments/upload/route.ts`)

**Endpoints:**

#### POST `/api/assignments/upload`
Handles file and link uploads

**Request (FormData):**
```javascript
{
  uploadType: 'file' | 'link',
  assignmentId: string,
  userId: string,
  files: File[],        // For file uploads
  links: string[]       // For link uploads
}
```

**Response:**
```json
{
  "success": true,
  "message": "Submission uploaded successfully",
  "data": {
    "id": "1234567890",
    "assignmentId": "assignment-1",
    "userId": "1",
    "submittedAt": "2026-02-24T...",
    "type": "file",
    "files": [
      {
        "name": "solution.py",
        "size": 12345,
        "path": "/uploads/assignment-1/1_timestamp_solution.py",
        "uploadedAt": "2026-02-24T..."
      }
    ],
    "links": []
  }
}
```

#### GET `/api/assignments/upload?assignmentId=X&userId=Y`
Retrieves submissions

**Query Parameters:**
- `assignmentId` (optional) - Filter by assignment
- `userId` (optional) - Filter by user

### 3. Data Storage

#### `submissions.json`
Stores all submission metadata:
```json
[
  {
    "id": "1234567890",
    "assignmentId": "assignment-1",
    "userId": "1",
    "submittedAt": "2026-02-24T...",
    "type": "file",
    "files": [...],
    "links": [...]
  }
]
```

#### `ideMock.json`
IDE-specific data with code file information:
```json
{
  "submissions": [
    {
      "id": "1234567890",
      "assignmentId": "assignment-1",
      "userId": "1",
      "codeFiles": [
        {
          "name": "solution.py",
          "size": 12345,
          "path": "/uploads/assignment-1/1_timestamp_solution.py",
          "type": "file",
          "content": "",
          "feedback": {}
        }
      ],
      "status": "submitted",
      "score": null,
      "feedback": {}
    }
  ]
}
```

### 4. IDE Component (`IDE.tsx`)

Monaco Editor-based code viewer with syntax highlighting.

**Usage:**
```tsx
import IDE from '@/components/assignment/IDE';

<IDE
  file={{
    type: 'file',
    name: 'solution.py',
    path: '/uploads/assignment-1/solution.py',
    content: '# Python code here\nprint("Hello")'
  }}
  readOnly={true}
/>
```

## 📝 How to Use

### 1. Setup
No additional setup required! The system automatically creates necessary directories.

### 2. Upload Files

**As a student:**
1. Navigate to assignment page: `/assignment/[id]`
2. Click "📁 Upload Files/ZIP" button
3. Either:
   - Drag and drop files
   - Click to browse and select files
4. Files are automatically uploaded to `/public/uploads/[assignmentId]/`

**File naming convention:**
```
[userId]_[timestamp]_[original filename]
Example: 1_1708800000000_solution.py
```

### 3. Add Links

1. Click "🔗 Add Link" button
2. Paste GitHub/Drive/Dropbox URL
3. Click "Add Link"
4. Link is saved to JSON with metadata

### 4. View Submissions

The assignment page automatically fetches and displays uploaded files/links on page load.

## 🔧 API Usage Examples

### Upload a File
```javascript
const formData = new FormData();
formData.append('uploadType', 'file');
formData.append('assignmentId', 'assignment-1');
formData.append('userId', '1');
formData.append('files', file1);
formData.append('files', file2);

const response = await fetch('/api/assignments/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result.data); // Submission info
```

### Upload a Link
```javascript
const formData = new FormData();
formData.append('uploadType', 'link');
formData.append('assignmentId', 'assignment-1');
formData.append('userId', '1');
formData.append('links', 'https://github.com/user/repo');

const response = await fetch('/api/assignments/upload', {
  method: 'POST',
  body: formData
});
```

### Get Submissions
```javascript
const response = await fetch(
  '/api/assignments/upload?assignmentId=assignment-1&userId=1'
);
const result = await response.json();
console.log(result.data); // Array of submissions
```

## 🎨 UI Features

### Upload Mode Toggle
```
[📁 Upload Files/ZIP] [🔗 Add Link]
```

### File Display
- **Files:** Blue icon 📄
- **Links:** Green icon 🔗 (clickable)
- Hover to show delete button
- Shows file size and upload time

### Upload States
- **Idle:** Normal border
- **Dragging:** Blue highlight
- **Uploading:** "Uploading..." message
- **Complete:** Success callback

## 🔐 Security Notes

⚠️ **Important for Production:**

1. **File Validation:** Add file type and size validation
2. **Authentication:** Add user authentication checks
3. **Authorization:** Verify user can submit to assignment
4. **Sanitization:** Sanitize file names and paths
5. **Virus Scanning:** Scan uploaded files
6. **Rate Limiting:** Prevent upload spam
7. **Storage Limits:** Implement quota management

**Example validation:**
```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['.py', '.js', '.zip', '.pdf'];

if (file.size > MAX_FILE_SIZE) {
  throw new Error('File too large');
}
```

## 📦 Dependencies

The system uses existing dependencies:
- `@monaco-editor/react` - Code editor (add if not installed)
- Next.js built-in APIs
- No additional packages required

**To install Monaco Editor:**
```bash
npm install @monaco-editor/react
```

## 🧪 Testing

### Test File Upload
1. Go to `/assignment/1`
2. Upload a `.py`, `.js`, or `.zip` file
3. Check `public/uploads/1/` folder
4. Check `data/submissions.json`
5. Check `data/ideMock.json`

### Test Link Upload
1. Click "🔗 Add Link"
2. Add: `https://github.com/username/repo`
3. Verify link appears with green icon
4. Click link to test opening in new tab

### Verify Data Persistence
1. Upload files
2. Refresh page
3. Verify files still show (fetched from API)

## 🎯 Next Steps

### Recommended Enhancements:
1. **File Preview:** Show code preview in IDE component
2. **Submission History:** Show all past submissions
3. **Version Control:** Track multiple submissions
4. **AI Evaluation:** Integrate with AI for code review
5. **Download:** Allow downloading submitted files
6. **Notifications:** Email/SMS on submission
7. **Grading UI:** Teacher interface for grading

### Example: Add File Preview
```tsx
// In StudentPortal.tsx
const [selectedFile, setSelectedFile] = useState(null);

{selectedFile && (
  <IDE
    file={selectedFile}
    readOnly={true}
  />
)}
```

## 📞 Support

For questions or issues:
- Check `data/submissions.json` for stored data
- Check browser console for API errors
- Check `public/uploads/` for uploaded files

## ✅ Checklist

- [x] File upload to public folder
- [x] Link upload support
- [x] JSON mock data storage
- [x] IDE mock integration
- [x] Drag & drop interface
- [x] Upload/download workflow
- [x] API endpoints (POST/GET)
- [x] Data persistence
- [x] UI polish and feedback
- [ ] Production security (TODO)
- [ ] File preview (TODO)
- [ ] Download functionality (TODO)

---

**Last Updated:** February 24, 2026
**Version:** 1.0.0
