# No-Code Website Builder

A modern, drag-and-drop website builder built with Next.js, React, and Tailwind CSS. Create beautiful websites without writing code.

## 🚀 Features

### Core Features
- **Drag & Drop Interface**: Intuitive visual editor with drag-and-drop functionality
- **Component Library**: Pre-built components including headings, text, buttons, images, containers
- **Real-time Preview**: See changes instantly as you build
- **Responsive Design**: Built-in responsive breakpoints (desktop, tablet, mobile)
- **Properties Panel**: Visual styling controls for colors, typography, spacing, and layout
- **Undo/Redo**: Full history management for safe editing
- **Component Selection**: Click to select and edit individual components

### Advanced Features
- **State Management**: Robust state handling with Zustand
- **Component Registry**: Extensible component system for easy addition of new elements
- **Dynamic Rendering**: Components render based on their type and properties
- **Flexible Styling**: CSS-in-JS approach with Tailwind integration

## �️ Technology Stack

### Frontend Framework
- **Next.js 15**: React framework with App Router
- **React 18**: Component-based UI library
- **JavaScript**: No TypeScript for simplicity

### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth interactions
- **Radix UI**: Accessible UI components
- **Lucide React**: Beautiful icon library

### Drag & Drop
- **@dnd-kit/core**: Modern drag-and-drop library
- **@dnd-kit/sortable**: Sorting functionality for components
- **@dnd-kit/utilities**: Helper utilities

### State Management
- **Zustand**: Lightweight state management
- **UUID**: Unique identifier generation

### Additional Libraries
- **Axios**: HTTP client for API calls
- **React Colorful**: Color picker component
- **Lodash**: Utility functions
- **HTML2Canvas**: Screenshot functionality

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/
│   │   ├── editor/[projectId]/
│   │   │   └── page.js     # Main editor interface
│   │   └── page.js         # Dashboard
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Landing page
├── components/
│   ├── builder/            # Builder-specific components
│   │   ├── BuilderInterface.js
│   │   ├── Canvas.js       # Main canvas area
│   │   ├── ComponentPanel.js # Component library
│   │   ├── PropertiesPanel.js # Property editor
│   │   ├── RenderComponent.js # Component renderer
│   │   ├── LayersPanel.js
│   │   └── Sidebar.js
│   ├── common/             # Shared components
│   ├── dashboard/          # Dashboard components
│   ├── editor/             # Editor-specific components
│   ├── elements/           # Individual element components
│   ├── properties/         # Property panels
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── store/              # State management
│   │   ├── editorStore.js  # Main editor state
│   │   ├── authStore.js
│   │   └── projectStore.js
│   └── utils/              # Utility functions
│       ├── componentRegistry.js # Component definitions
│       ├── exportUtils.js
│       └── styleUtils.js
└── public/                 # Static assets
```

## 🏗️ Architecture

### Component System
The builder uses a flexible component system where each component has:
- **Type**: Unique identifier (heading, text, button, etc.)
- **Properties**: Content, styles, and configuration
- **Children**: Nested components for containers

### State Management
The editor state is managed by Zustand with:
- **Components Array**: List of all components on the canvas
- **Selected Component**: Currently selected component ID
- **History**: Undo/redo functionality
- **Breakpoints**: Responsive design states

### Drag & Drop Flow
1. **Component Panel**: Users drag components from the library
2. **Canvas**: Droppable area that accepts components
3. **DndContext**: Manages drag operations
4. **SortableContext**: Handles component reordering

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next-no-code
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

### Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## � How to Use

### Basic Workflow

1. **Access Editor**: Navigate to `/dashboard/editor/[projectId]`
2. **Add Components**: Drag components from the left panel to the canvas
3. **Edit Properties**: Select components and modify properties in the right panel
4. **Preview**: Switch between desktop, tablet, and mobile views
5. **Save**: Export or save your project

### Adding New Components

1. **Define Component**: Add to `componentRegistry.js`
   ```javascript
   {
     type: 'new_component',
     label: 'New Component',
     icon: 'IconName',
     defaultProps: {
       content: 'Default content',
       styles: { /* default styles */ }
     }
   }
   ```

2. **Implement Renderer**: Add case in `RenderComponent.js`
   ```javascript
   case componentTypes.NEW_COMPONENT:
     return <div>{component.content}</div>;
   ```

3. **Add Properties**: Extend `PropertiesPanel.js` if needed

## 🔧 Key Components Explained

### Canvas (`Canvas.js`)
- Main building area
- Handles component dropping
- Manages responsive breakpoints
- Renders all components via `RenderComponent`

### ComponentPanel (`ComponentPanel.js`)
- Displays available components
- Makes components draggable
- Uses `@dnd-kit` for drag functionality

### PropertiesPanel (`PropertiesPanel.js`)
- Visual property editor
- Supports text, colors, spacing, typography
- Updates component styles in real-time

### RenderComponent (`RenderComponent.js`)
- Renders individual components based on type
- Handles component selection
- Manages sortable functionality

### Editor Store (`editorStore.js`)
- Central state management
- Handles component CRUD operations
- Manages undo/redo history
- Controls responsive breakpoints

## 🎨 Styling Guide

### Tailwind Classes
The builder uses Tailwind CSS for styling with custom utilities in `globals.css`.

### Component Styling
Components use inline styles for dynamic properties and Tailwind classes for layout.

### Theme System
- Light theme by default
- Extensible color palette
- Consistent spacing scale

## 🔄 Data Flow

1. **User Action** → Component interaction
2. **Event Handler** → Updates store state
3. **Store Update** → Triggers re-render
4. **Component Re-render** → Visual feedback

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local` for configuration:
```env
NEXT_PUBLIC_API_URL=https://api.yourapp.com
```

## 🔮 Future Enhancements

### Planned Features
- **Template Library**: Pre-built page templates
- **Collaborative Editing**: Real-time collaboration
- **Custom Domains**: Domain connection
- **Analytics**: Built-in analytics dashboard
- **E-commerce**: Product and cart components
- **CMS Integration**: Content management system

### Technical Improvements
- **Performance**: Code splitting and lazy loading
- **Accessibility**: WCAG compliance
- **Testing**: Comprehensive test suite
- **Documentation**: API documentation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@yourapp.com or join our Discord community.

---

Built with ❤️ using Next.js and React
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