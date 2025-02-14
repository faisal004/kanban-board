import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { Actions, Priority, State, Status } from '@/types/types'


export const useTaskStore = create<State & Actions>()(

    set => ({
      tasks: [],
      addTask: (title: string, description: string,status:Status,priority:Priority) =>
        set(state => ({
          tasks: [
            ...state.tasks,
            { id: uuid(), title, description, status: status,priority:priority }
          ]
        })),
      removeTask: (id: string) =>
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id)
        })),
      updateTask: (id: string, status: Status) =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, status } : task
          )
        }))
    }),
  
)