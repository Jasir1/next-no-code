// lib/store/editorStore.js
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useEditorStore = create((set, get) => ({
  // State
  components: [],
  selectedComponent: null,
  history: [],
  historyIndex: -1,
  currentBreakpoint: 'desktop', // desktop, tablet, mobile
  
  // Actions
  addComponent: (component) => {
    const newComponent = {
      id: uuidv4(),
      ...component,
      styles: component.styles || {},
      children: []
    };
    
    set((state) => {
      const newComponents = [...state.components, newComponent];
      return {
        components: newComponents,
        selectedComponent: newComponent.id,
      };
    });
    
    get().saveHistory();
  },
  
  updateComponent: (id, updates) => {
    set((state) => ({
      components: state.components.map((comp) =>
        comp.id === id ? { ...comp, ...updates } : comp
      ),
    }));
    get().saveHistory();
  },
  
  deleteComponent: (id) => {
    set((state) => ({
      components: state.components.filter((comp) => comp.id !== id),
      selectedComponent: state.selectedComponent === id ? null : state.selectedComponent,
    }));
    get().saveHistory();
  },
  
  selectComponent: (id) => {
    set({ selectedComponent: id });
  },
  
  reorderComponents: (newComponents) => {
    set({ components: newComponents });
    get().saveHistory();
  },
  
  setBreakpoint: (breakpoint) => {
    set({ currentBreakpoint: breakpoint });
  },
  
  // Undo/Redo
  saveHistory: () => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(state.components);
      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },
  
  undo: () => {
    set((state) => {
      if (state.historyIndex > 0) {
        return {
          historyIndex: state.historyIndex - 1,
          components: state.history[state.historyIndex - 1],
        };
      }
      return state;
    });
  },
  
  redo: () => {
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        return {
          historyIndex: state.historyIndex + 1,
          components: state.history[state.historyIndex + 1],
        };
      }
      return state;
    });
  },
  
  clearCanvas: () => {
    set({ components: [], selectedComponent: null });
    get().saveHistory();
  },
}));