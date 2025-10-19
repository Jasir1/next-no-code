// app/editor/[projectId]/page.js
"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState, useEffect, use } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import Canvas from "@/components/builder/Canvas";
import ComponentPanel from "@/components/builder/ComponentPanel";
import PropertiesPanel from "@/components/builder/PropertiesPanel";
import {
  Undo2,
  Redo2,
  Eye,
  Save,
  ArrowLeft,
  Smartphone,
  Tablet,
  Monitor,
  Download,
  Plus,
  LayoutGrid,
  Settings,
  Type,
  Image as ImageIcon,
  List,
  Columns,
  GalleryThumbnails,
  X,
  Menu,
  Maximize2,
  Minimize2,
  Code2,
  Palette,
  History,
  HelpCircle,
  User,
} from "lucide-react";
import Link from "next/link";
// import Label from '@/components/ui/Label';
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

// Block categories for the inserter
const BLOCK_CATEGORIES = [
  { id: "layout", label: "Layout Elements", icon: <LayoutGrid size={16} /> },
  { id: "text", label: "Text", icon: <Type size={16} /> },
  { id: "media", label: "Media", icon: <ImageIcon size={16} /> },
  { id: "design", label: "Design", icon: <Palette size={16} /> },
];

// Sample blocks in each category
const BLOCKS = {
  layout: [
    { id: "section", label: "Section", icon: <GalleryThumbnails size={16} /> },
    { id: "columns", label: "Columns", icon: <Columns size={16} /> },
    { id: "list", label: "List", icon: <List size={16} /> },
  ],
  text: [
    { id: "heading", label: "Heading" },
    { id: "paragraph", label: "Paragraph" },
    { id: "button", label: "Button" },
  ],
  media: [
    { id: "image", label: "Image" },
    { id: "gallery", label: "Gallery" },
    { id: "video", label: "Video" },
  ],
  design: [
    { id: "spacer", label: "Spacer" },
    { id: "divider", label: "Divider" },
    { id: "shape", label: "Shape" },
  ],
};

export default function EditorPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { projectId } = params;
  const { addComponent, undo, redo } = useEditorStore();
  const [activeId, setActiveId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [device, setDevice] = useState("desktop");
  const [isInserterOpen, setIsInserterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("layout");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === "canvas") {
      const componentData = active.data.current;
      addComponent({
        type: componentData.type,
        ...componentData.defaultProps,
      });
    }

    setActiveId(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Replace with actual API call
      // await saveProject(projectId, { components, history });
      alert("Project saved successfully!");
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    // This is a placeholder. In a real app, you would generate and download the project files
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify({ components, history }, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `project-${projectId}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.log);
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Top Admin Bar */}
        <div className="h-10 bg-gray-900 text-white px-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="flex items-center hover:text-blue-300"
            >
              <span className="font-bold">NoCode</span>
            </Link>
            <span className="text-gray-400">|</span>
            <button className="hover:text-blue-300">New</button>
            <button className="hover:text-blue-300">Edit</button>
            <button className="hover:text-blue-300">View</button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleFullscreen}
              className="hover:text-blue-300"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button className="hover:text-blue-300">
              <HelpCircle size={16} />
            </button>
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs">
              <User size={14} />
            </div>
          </div>
        </div>

        {/* Main Toolbar */}
        <div className="h-14 bg-white border-b flex items-center justify-between px-4 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold hidden md:block">
              Page Builder
            </h1>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={undo}
                className="p-2 hover:bg-gray-100 rounded"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-5 h-5" />
              </button>
              <button
                onClick={redo}
                className="p-2 hover:bg-gray-100 rounded"
                title="Redo (Ctrl+Shift+Z)"
              >
                <Redo2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsInserterOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Add Block</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-md">
              <button
                onClick={() => setDevice("mobile")}
                className={`p-2 rounded ${
                  device === "mobile" ? "bg-white shadow" : "hover:bg-gray-200"
                }`}
                title="Mobile (M)"
              >
                <Smartphone className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDevice("tablet")}
                className={`p-2 rounded ${
                  device === "tablet" ? "bg-white shadow" : "hover:bg-gray-200"
                }`}
                title="Tablet (T)"
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDevice("desktop")}
                className={`p-2 rounded ${
                  device === "desktop" ? "bg-white shadow" : "hover:bg-gray-200"
                }`}
                title="Desktop (D)"
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Download"
              >
                <Download className="h-5 w-5" />
              </button>
              <Link
                href={`/dashboard/preview/${projectId}`}
                target="_blank"
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Preview"
              >
                <Eye className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
              <Button onClick={handleSave} disabled={isSaving} className="ml-2">
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Mobile Sidebar */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div
                className="fixed inset-0 bg-black/50"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div className="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-lg z-50 p-4 overflow-y-auto mobile-menu">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Save className="h-4 w-4 mr-2" /> Save
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" /> Preview
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                  <Separator className="my-2" />
                  <h3 className="text-sm font-medium text-gray-500 px-2">
                    Blocks
                  </h3>
                  <Button variant="ghost" className="w-full justify-start">
                    <LayoutGrid className="h-4 w-4 mr-2" /> All Blocks
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Type className="h-4 w-4 mr-2" /> Text
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <ImageIcon className="h-4 w-4 mr-2" /> Media
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Left Sidebar - Components */}
          <div className="hidden md:block w-64 bg-white border-r overflow-y-auto">
            <Tabs defaultValue="components" className="h-full flex flex-col">
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="components" className="flex-1">
                  Components
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex-1">
                  Templates
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex-1">
                  Saved
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="components"
                className="flex-1 overflow-auto p-2"
              >
                <ComponentPanel />
              </TabsContent>
              <TabsContent value="templates" className="p-4">
                <div className="space-y-4">
                  <div className="border rounded-md p-3 hover:border-blue-500 cursor-pointer">
                    <div className="h-20 bg-gray-100 mb-2 rounded"></div>
                    <h4 className="text-sm font-medium">Hero Section</h4>
                    <p className="text-xs text-gray-500">
                      A full-width hero with heading and CTA
                    </p>
                  </div>
                  <div className="border rounded-md p-3 hover:border-blue-500 cursor-pointer">
                    <div className="h-20 bg-gray-100 mb-2 rounded"></div>
                    <h4 className="text-sm font-medium">Features Grid</h4>
                    <p className="text-xs text-gray-500">
                      Showcase features in a responsive grid
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="saved" className="p-4">
                <p className="text-sm text-gray-500 text-center py-4">
                  Your saved components will appear here
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Canvas */}
          <div
            className={`flex-1 overflow-auto transition-all duration-200 bg-gray-50 ${
              device === "mobile"
                ? "max-w-md mx-auto border-x-8 border-gray-800 rounded-lg h-[90%] my-4"
                : device === "tablet"
                ? "max-w-3xl mx-auto border-x-8 border-gray-800 rounded-lg h-[90%] my-4"
                : "w-full h-full"
            }`}
          >
            <div className="relative h-full">
              <div className="absolute top-4 right-4 z-10 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 backdrop-blur-sm"
                >
                  <Code2 className="h-4 w-4 mr-1" /> Code
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 backdrop-blur-sm"
                >
                  <History className="h-4 w-4 mr-1" /> History
                </Button>
              </div>
              <Canvas />
            </div>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="hidden lg:block w-80 bg-white border-l overflow-y-auto">
            <div className="p-4 border-b">
              <h3 className="font-medium">Block Settings</h3>
              <p className="text-sm text-gray-500">
                Select a block to edit its properties
              </p>
            </div>
            <PropertiesPanel />
          </div>
        </div>

        {/* Block Inserter */}
        {isInserterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-medium">Add Block</h3>
                <button
                  onClick={() => setIsInserterOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 border-b">
                <Input
                  placeholder="Search for a block..."
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="w-48 border-r">
                  <Tabs
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    orientation="vertical"
                    className="h-full"
                  >
                    <TabsList className="flex-col h-full w-full rounded-none border-0">
                      {BLOCK_CATEGORIES.map((category) => (
                        <TabsTrigger
                          key={category.id}
                          value={category.id}
                          className="w-full justify-start"
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {BLOCKS[selectedCategory]?.map((block) => (
                      <div
                        key={block.id}
                        className="border rounded p-3 hover:border-blue-500 cursor-pointer flex flex-col items-center text-center"
                        onClick={() => {
                          addComponent({
                            type: block.id,
                            ...block.defaultProps,
                          });
                          setIsInserterOpen(false);
                        }}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                          {block.icon || (
                            <LayoutGrid size={20} className="text-gray-500" />
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {block.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {isSettingsOpen && (
          <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50 border-l">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Page Settings</h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Page Title</h4>
                <Input placeholder="Enter page title" />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Page URL</h4>
                <div className="flex">
                  <div className="bg-gray-100 px-3 py-2 text-sm border rounded-l-md border-r-0 text-gray-500">
                    /page/
                  </div>
                  <Input placeholder="page-url" className="rounded-l-none" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Featured Image</h4>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Set featured image
                  </button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-md h-32 flex items-center justify-center bg-gray-50">
                  <span className="text-sm text-gray-500">
                    Set featured image
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Page Attributes</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="template">Template</Label>
                    <select
                      id="template"
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    >
                      <option>Default Template</option>
                      <option>Full Width</option>
                      <option>Landing Page</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="parent">Parent Page</Label>
                    <select
                      id="parent"
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    >
                      <option>(no parent)</option>
                      <option>Home</option>
                      <option>About</option>
                      <option>Contact</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="order">Menu Order</Label>
                    <Input
                      id="order"
                      type="number"
                      className="w-20"
                      defaultValue="0"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Advanced</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="css-classes">CSS Classes</Label>
                    <Input
                      id="css-classes"
                      placeholder="custom-class another-class"
                      className="w-64"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="custom-css">Custom CSS</Label>
                    <Button variant="outline" size="sm">
                      Edit CSS
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="bg-blue-100 p-4 rounded shadow-lg border border-blue-200">
            <div className="flex items-center">
              <LayoutGrid size={16} className="mr-2 text-blue-600" />
              <span className="text-sm font-medium">Dragging {activeId}</span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
