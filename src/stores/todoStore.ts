import { sync } from "@tonk/keepsync";
import { create } from "zustand";

// Define the Todo type with additional properties for a more robust app
export interface Todo {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  createdAt: number;
  priority: "TTRPG" | "puzzle" | "sports";
}

// Define the filter options
export type FilterOption = "all" | "TTRPG" | "puzzle" | "sports";

// Define the sort options
export type SortOption = "createdAt" | "priority" | "dueDate";

// Define the data structure
interface TodoData {
  todos: Todo[];
}

// Define the store state with more sophisticated functionality
interface TodoState extends TodoData {
  // Core CRUD operations
  addTodo: (text: string, description: string, priority?: Todo["priority"]) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodoText: (id: string, text: string) => void;
  updateTodoPriority: (id: string, priority: Todo["priority"]) => void;
  updateTodoDueDate: (id: string, dueDate?: string) => void;
  updateTodoDetails: (id: string, text: string, description: string) => void;
  
  // Batch operations
  clearCompleted: () => void;
  deleteAll: () => void;
  
  // Computed properties for the UI
  getFilteredAndSortedTodos: (filter: FilterOption, sort: SortOption, sortDirection: "asc" | "desc") => Todo[];
  getRemainingCount: () => number;
  getCompletedCount: () => number;
}

// Create a synced store for todos
export const useTodoStore = create<TodoState>(
  sync(
    (set, get) => ({
      todos: [],

      // Core CRUD operations
      addTodo: (text, description, priority = "puzzle") => {
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              text,
              description,
              completed: false,
              createdAt: Date.now(),
              priority,
            },
          ],
        }));
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      updateTodoText: (id, text) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          ),
        }));
      },

      updateTodoPriority: (id, priority) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, priority } : todo
          ),
        }));
      },

      updateTodoDueDate: (id, dueDate) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, dueDate } : todo
          ),
        }));
      },

      updateTodoDetails: (id, text, description) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text, description } : todo
          ),
        }));
      },

      // Batch operations
      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },

      deleteAll: () => {
        set({ todos: [] });
      },

      // Computed methods for the UI
      getFilteredAndSortedTodos: (filter, sort, sortDirection) => {
        const { todos } = get();
        
        // First filter the todos
        const filteredTodos = todos.filter((todo) => {
          if (filter === "all") return true;
          return todo.priority === filter;
        });
        
        // Then sort them
        return filteredTodos.sort((a, b) => {
          let comparison = 0;
          
          if (sort === "name") {
            comparison = a.text.localeCompare(b.text);
          } else if (sort === "rate") {
            // Placeholder for rate sorting logic
          } else if (sort === "popularity") {
            // Placeholder for popularity sorting logic
          }
          
          // Reverse the comparison for descending order
          return sortDirection === "asc" ? comparison : -comparison;
        });
      },

      getRemainingCount: () => {
        return get().todos.filter((todo) => !todo.completed).length;
      },

      getCompletedCount: () => {
        return get().todos.filter((todo) => todo.completed).length;
      },
    }),
    {
      // Unique document ID for this store
      docId: "game-list",
    }
  )
);