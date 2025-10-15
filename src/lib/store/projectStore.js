import { create } from 'zustand';

export const useProjectStore = create((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,

  // Fetch all projects
  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/projects');
      const projects = await response.json();
      set({ projects, isLoading: false });
    } catch (error) {
      console.error('Error fetching projects:', error);
      set({ isLoading: false });
    }
  },

  // Create new project
  createProject: async (projectData) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      const newProject = await response.json();
      
      set((state) => ({
        projects: [newProject, ...state.projects],
      }));
      
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Update project
  updateProject: async (projectId, updates) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedProject = await response.json();

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId ? updatedProject : p
        ),
        currentProject:
          state.currentProject?.id === projectId
            ? updatedProject
            : state.currentProject,
      }));

      return updatedProject;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete project
  deleteProject: async (projectId) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      set((state) => ({
        projects: state.projects.filter((p) => p.id !== projectId),
      }));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Set current project
  setCurrentProject: (project) => {
    set({ currentProject: project });
  },

  // Clear current project
  clearCurrentProject: () => {
    set({ currentProject: null });
  },
}));