import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { Actions, Assignee, Priority, State, Status, Task } from '@/types/types';

export const useTaskStore = create<State & Actions>((set) => ({
  tasks: [],
  addTask: (title: string, description: string, status: Status, priority: Priority, assignee: Assignee, dueDate: string) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: uuid(), title, description, status, priority, assignee, dueDate }
      ]
    })),
  removeTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== id)
    })),
  updateTask: (id: string, updatedFields: Partial<Task>) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    }))
}));