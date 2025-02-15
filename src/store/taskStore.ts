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
    comments: [
      {
        id: uuid(),
        userId: "2",
        userName: "Jane Smith",
        content: "I noticed this bug too. Thanks for fixing it!",
        timestamp: "2025-02-14T10:30:00Z",
      },
      {
        id: uuid(),
        userId: "3",
        userName: "Alice Brown",
        content: "Navbar updates correctly now. Great job!",
        timestamp: "2025-02-14T12:45:00Z",
      },
    ],
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
    comments: [
      {
        id: uuid(),
        userId: "4",
        userName: "Bob Johnson",
        content: "Indexes will definitely help! Let’s benchmark after changes.",
        timestamp: "2025-02-14T09:00:00Z",
      },
    ],
  },
  {
    id: uuid(),
    title: "Implement Dark Mode",
    description: "Add a toggle for dark mode and persist user preference.",
    status: "TODO",
    priority: "MEDIUM",
    assignee: {
      id: "3",
      name: "Alice Brown",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    dueDate: "2025-02-20",
  },
  {
    id: uuid(),
    title: "Write Unit Tests",
    description: "Improve test coverage for core functionalities.",
    status: "TODO",
    priority: "HIGH",
    assignee: {
      id: "4",
      name: "Bob Johnson",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    dueDate: "2025-02-22",
    comments: [
      {
        id: uuid(),
        userId: "2",
        userName: "Jane Smith",
        content: "Tests will help catch regressions early!",
        timestamp: "2025-02-15T08:20:00Z",
      },
    ],
  },
  {
    id: uuid(),
    title: "Refactor API Endpoints",
    description: "Improve REST API structure and remove redundant endpoints.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    assignee: {
      id: "1",
      name: "Joe Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    dueDate: "2025-02-19",
    comments: [
      {
        id: uuid(),
        userId: "3",
        userName: "Alice Brown",
        content: "We should also consider versioning the API.",
        timestamp: "2025-02-14T15:30:00Z",
      },
      {
        id: uuid(),
        userId: "4",
        userName: "Bob Johnson",
        content: "Yes, and document the changes properly!",
        timestamp: "2025-02-14T16:00:00Z",
      },
    ],
  },
  {
    id: uuid(),
    title: "Enhance UI/UX",
    description: "Improve form validation and add loading states.",
    status: "TODO",
    priority: "MEDIUM",
    assignee: {
      id: "3",
      name: "Alice Brown",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    dueDate: "2025-02-25",
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
    })),
    addComment: (taskId, comment) =>
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                comments: [...(task.comments || []), comment],
              }
            : task
        ),
      })),
}));