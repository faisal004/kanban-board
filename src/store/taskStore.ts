import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { Actions, Assignee, Priority, State, Status, Task } from '@/types/types';


const defaultTasks: Task[] = [
  {
    id: uuid(),
    title: "Implement Authentication",
    description: "Set up OAuth and JWT authentication for the app.",
    status: "TODO",
    priority: "HIGH",
    assignee: {
      id: "1",
      name: "Joe Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    dueDate: "2025-02-15",
  },
  {
    id: uuid(),
    title: "Fix Navbar Bug",
    description: "Resolve issue with navbar not updating on route change.",
    status: "DONE",
    priority: "LOW",
    assignee: {
      id: "1",
      name: "Joe Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    dueDate: "2025-02-15",
  },
  {
    id: uuid(),
    title: "Database Optimization",
    description: "Optimize queries and indexes for better performance.",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    assignee: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    dueDate: "2025-02-18",
  },
];



export const useTaskStore = create<State & Actions>((set) => ({
  tasks: defaultTasks,
  draggedTask: null,
  addTask: (title: string, description: string, status: Status, priority: Priority, assignee: Assignee, dueDate: string) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: uuid(), title, description, status, priority, assignee, dueDate }
      ]
    })),
  dragTask: (id: string | null) => set({ draggedTask: id }),

  removeTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== id)
    })),
  updateTask: (id: string, updatedFields: Partial<Task>) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    })),
  updateTaskAfterDrag: (id: string, status: Status) =>
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, status } : task
      )
    }))
}));