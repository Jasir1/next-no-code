// components/editor/BlockPatternsModal.jsx
'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlockPatterns } from './BlockPatterns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function BlockPatternsModal({ open, onOpenChange, onInsert }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Block Patterns</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="sections" className="flex-1 flex flex-col">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="saved">My Patterns</TabsTrigger>
          </TabsList>
          <TabsContent value="sections" className="flex-1 overflow-auto p-4">
            <BlockPatterns onInsert={onInsert} />
          </TabsContent>
          <TabsContent value="pages" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="h-40 bg-gray-100"></div>
                  <div className="p-4">
                    <h4 className="font-medium">Page Template {i}</h4>
                    <p className="text-sm text-gray-500">Description of page template</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="saved" className="p-4">
            <div className="text-center py-8 text-gray-500">
              <p>No saved patterns yet.</p>
              <p className="text-sm">Save your favorite patterns for quick access.</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}