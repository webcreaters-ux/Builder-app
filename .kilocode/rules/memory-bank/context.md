# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ Enhanced developer IDE experience

The template now includes a multi-pane IDE-style interface with AI assistance, live preview, terminal simulation, package manager, git panel, command palette, templates, and search/replace.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] Added IDE-like layout with tabs, terminal, preview, status bar, and command palette
- [x] Added AI assistant actions (refactor, debug, generate tests)
- [x] Added project templates and project import/export
- [x] Added search & replace panel
- [x] Added package manager and Git UI panels
- [x] Extended store for open tabs, templates, packages, and git status

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page (IDE UI) | ✅ Enhanced |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |
| `src/components/Terminal.tsx` | In-app terminal simulation | ✅ Added |
| `src/components/LivePreview.tsx` | Live preview panel | ✅ Added |
| `src/components/CommandPalette.tsx` | Command palette | ✅ Added |
| `src/components/Tabs.tsx` | File tab bar | ✅ Added |
| `src/components/StatusBar.tsx` | IDE status bar | ✅ Added |
| `src/components/Templates.tsx` | Project templates | ✅ Added |
| `src/components/SearchReplace.tsx` | Search & replace | ✅ Added |
| `src/components/PackageManager.tsx` | Package manager UI | ✅ Added |
| `src/components/GitPanel.tsx` | Git status/commit/push | ✅ Added |

## Current Focus

Polish and validate IDE controls and ensure all panels work smoothly across layout modes.

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-02-13 | Added IDE UI features: command palette, terminal, live preview, templates, search/replace, package & git panels |
