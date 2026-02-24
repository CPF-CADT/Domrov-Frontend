# VS Code-Style Code Editor - Feature Guide

## What's New

I've created a **beautiful VS Code-like code editor** with a **unique purple/pink gradient theme** that appears when you click on uploaded files!

## Features

### 1. **Full Code Editor View**
- File explorer sidebar
- Multiple file tabs
- Syntax highlighting (Python, JavaScript, Java, C++, etc.)
- Beautiful gradient theme (purple, pink, blue)
- Smooth animations

### 2. **ZIP File Extraction** 
- Click any `.zip` file → Automatically extracts all files
- View all files from the ZIP in the file explorer
- Navigate through folder structure
- Open any file from the ZIP

### 3. **Single File Preview**
- Click any code file (`.py`, `.js`, `.java`, etc.)
- Opens in the full code editor
- Syntax highlighting based on file type

## How to Use

### Upload & View Files

1. **Upload a single file:**
   - Upload `solution.py` or any code file
   - Click on the file name
   - → Opens in full code editor view

2. **Upload a ZIP file:**
   - Upload `project.zip` containing multiple files
   - Click on the ZIP file
   - → Automatically extracts and shows all files in explorer
   - → Click any file in the explorer to view it

### Editor Features

**File Explorer (Left Sidebar):**
- Folders can be collapsed/expanded
- Files show icons based on type
- Click any file to open it in the editor

**Tabs (Top Bar):**
- Multiple files can be open at once
- Click tab to switch between files
- Click X on tab to close file
- Active tab highlighted with gradient

**Editor:**
- Full Monaco Editor with syntax highlighting
- Read-only mode (view code)
- Auto-detects language from file extension

**Navigation:**
- Click green button (top-left) to close editor
- Click "← Back to Assignment" button to return

## Design Theme

**Color Scheme:**
- Background: Dark slate with purple gradient
- Sidebar: Slate 800-900 gradient
- Active elements: Purple-to-pink gradient
- File highlights: Blue-to-indigo gradient

**Icons:**
- Python files
- React/JSX files
- TypeScript files
- Java files
- C/C++ files
- HTML files
- CSS files
- JSON files
- Markdown files

## Technical Details

### New Files Created:

1. **`components/assignment/CodeEditorView.tsx`**
   - Main code editor component
   - File tree viewer
   - Tab management
   - Gradient theme styling

2. **`app/api/assignments/extract-zip/route.ts`**
   - ZIP extraction API endpoint
   - Uses `adm-zip` library
   - Returns extracted file structure

### Updated Files:

- `app/assignment/[id]/page.tsx` - Added editor view logic
- `components/assignment/UploadSection.tsx` - File click handlers
- `components/assignment/StudentPortal.tsx` - Props passing

### Dependencies Added:
```bash
npm install adm-zip @types/adm-zip
```

## Example Usage

```typescript
// When clicking a ZIP file:
1. Sends request to /api/assignments/extract-zip
2. Receives array of files with content
3. Opens CodeEditorView with file tree
4. User can navigate and view all files

// When clicking a single file:
1. Fetches file content from public/uploads
2. Opens CodeEditorView with single file
3. User can view code with syntax highlighting
```

## File Type Support

**Code Files (with highlighting):**
- `.py` - Python
- `.js`, `.jsx` - JavaScript/React
- `.ts`, `.tsx` - TypeScript
- `.java` - Java
- `.c`, `.cpp`, `.h` - C/C++
- `.cs` - C#
- `.html`, `.css` - Web
- `.json`, `.xml`, `.yaml` - Data

**Archive Files:**
- `.zip` - Auto-extracts and shows contents

## Try It Out

1. Go to `/assignment/test-assignment`
2. Upload a ZIP file containing code files
3. Click the ZIP file
4. See all files appear in the explorer
5. Click any file to view with syntax highlighting
6. Use tabs to switch between files
7. Click "Back to Assignment" when done

## UI Screenshots

**Editor View:**
```
┌─────────────────────────────────────────────┐
│ Code Editor           [← Back to Assignment]│
├──────────┬──────────────────────────────────┤
│ Files    │ main.py [x]  utils.py [x]       │
│          ├──────────────────────────────────┤
│ src      │                                  │
│  main    │  # Python code here              │
│  utils   │  def hello():                    │
│ tests    │      print("Hello")              │
│  test    │                                  │
│          │  [Monaco Editor with syntax]     │
└──────────┴──────────────────────────────────┘
```

## Tips

- **ZIP files**: Must be uploaded to `public/uploads/` folder
- **File paths**: Files maintain their folder structure from ZIP
- **Tabs**: Can open multiple files for comparison
- **Theme**: Custom gradient theme different from VS Code
- **Performance**: Loads files on-demand for better speed

---

**Enjoy your new code editor!**
