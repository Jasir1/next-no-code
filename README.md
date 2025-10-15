# Website Builder - Frontend

A professional no-code website builder built with Next.js 14, featuring drag-and-drop functionality, visual editing, and responsive design capabilities.

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **@dnd-kit** - Drag and drop functionality
- **React Colorful** - Color picker
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.js          # Root layout
│   ├── page.js            # Landing page
│   ├── dashboard/         # Projects dashboard
│   ├── editor/            # Visual editor
│   └── preview/           # Preview mode
├── components/
│   ├── builder/           # Editor components
│   ├── elements/          # Draggable elements
│   ├── properties/        # Property editors
│   ├── ui/                # Reusable UI components
│   └── common/            # Header/Footer
├── lib/
│   ├── store/             # Zustand stores
│   ├── utils/             # Utility functions
│   └── api/               # API client
├── public/                # Static assets
└── styles/                # Global styles
```

## 🛠️ Installation

### 1. Create Next.js Project

```bash
npx create-next-app@latest website-builder-frontend
# Choose:
# ❌ TypeScript: No
# ✅ Tailwind CSS: Yes
# ✅ App Router: Yes
# ❌ src directory: No

cd website-builder-frontend
```

### 2. Install Dependencies

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities zustand react-hook-form lucide-react react-colorful uuid html2canvas axios clsx lodash
```

### 3. Copy Project Files

Copy all the provided files into their respective directories according to the project structure above.

### 4. Configure Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📖 Features

### Current Features

✅ **Drag & Drop Builder**
- Visual component placement
- Sortable components
- Nested containers support

✅ **Component Library**
- Text & Headings
- Images with upload
- Buttons
- Containers
- Forms
- Videos

✅ **Visual Styling**
- Color picker
- Typography controls
- Spacing (margin/padding)
- Borders & shadows
- Layout options (Flex/Grid)

✅ **Responsive Design**
- Desktop/Tablet/Mobile preview
- Breakpoint switcher
- Device frames

✅ **Export Functionality**
- Export as HTML/CSS
- Export as React component
- Download files

✅ **Layer Management**
- Visual hierarchy
- Show/hide layers
- Component selection

✅ **Undo/Redo**
- History management
- State preservation

### Upcoming Features (Phase 2)

🔜 **Backend Integration**
- User authentication
- Project CRUD operations
- Cloud storage for assets
- Database persistence

🔜 **Advanced Components**
- Navigation menus
- Carousels/Sliders
- Galleries
- Maps integration
- Social media embeds

🔜 **Templates**
- Pre-built page templates
- Section templates
- Industry-specific designs

🔜 **Collaboration**
- Real-time editing
- Comments & feedback
- Version history

🔜 **Publishing**
- Custom domains
- SSL certificates
- CDN integration
- SEO optimization

## 🎯 Usage Guide

### Creating a New Project

1. Navigate to Dashboard (`/dashboard`)
2. Click "New Project"
3. Start building in the Editor

### Using the Editor

1. **Add Components**: Drag components from the left sidebar onto the canvas
2. **Edit Properties**: Select a component and use the right sidebar to edit styles
3. **Arrange Components**: Drag to reorder, use layers panel for complex hierarchies
4. **Preview**: Switch between device sizes using the toolbar
5. **Save**: Click "Save" to persist your work
6. **Export**: Click "Export" to download HTML or React code

### Keyboard Shortcuts

- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo
- `Delete` - Remove selected component
- `Ctrl/Cmd + S` - Save project

## 🔌 API Integration

The frontend is ready to connect to your Laravel backend. Update the API client in `lib/api/client.js`:

```javascript
// Configure your Laravel API URL
baseURL: 'http://your-laravel-api.com/api'
```

### Expected API Endpoints

```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/auth/me
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
POST   /api/assets/upload
```

## 🎨 Customization

### Adding New Components

1. Create component in `components/elements/YourComponent.jsx`
2. Add to registry in `lib/utils/componentRegistry.js`
3. Update render logic in `components/builder/RenderComponent.jsx`

### Custom Styling

Modify `tailwind.config.js` to add custom colors, fonts, etc:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        500: '#your-color',
      }
    }
  }
}
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Components not dragging
- Ensure @dnd-kit packages are installed correctly
- Check browser console for errors

### Styles not saving
- Verify Zustand store is configured properly
- Check localStorage in browser DevTools

### API calls failing
- Verify NEXT_PUBLIC_API_URL in .env.local
- Check CORS settings on backend
- Ensure Laravel API is running

## 📝 Next Steps

1. **Set up Laravel Backend** - User auth, projects API, file storage
2. **Implement Templates** - Create pre-built designs
3. **Add More Components** - Expand component library
4. **Responsive Breakpoints** - Per-breakpoint styling
5. **Publishing System** - Deploy to custom domains
6. **Analytics** - Track usage and performance
7. **Billing** - Integrate payment system

## 🤝 Contributing

This is a commercial SaaS project. Follow best practices:

- Write clean, maintainable code
- Add comments for complex logic
- Test all features thoroughly
- Follow the existing code style
- Update documentation

## 📄 License

Proprietary - All rights reserved

## 🙋 Support

For issues or questions, check the documentation or contact support.

---

Built with ❤️ for creators who want to build without limits