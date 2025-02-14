import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { Column, ColumnActions, ColumnsState } from '@/types/types';

const defaultColumns: Column[] = [
    { id: uuid(), title: 'Todo', status: 'TODO',color: 'bg-blue-500'  },
    { id: uuid(), title: 'In Progress', status: 'IN_PROGRESS', color: 'bg-yellow-500'  },
    { id: uuid(), title: 'Done', status: 'DONE', color: 'bg-green-500'  }
];

export const useColumnStore = create<ColumnsState & ColumnActions>((set) => ({

    columns: defaultColumns,

    addColumn: (title: string, color: string) =>
        set((state) => ({
            columns: [
                ...state.columns,
                { id: uuid(), title, status: title.toUpperCase().replace(/\s+/g, '_'), color }
            ]
        })),

    removeColumn: (id: string) =>
        set((state) => ({
            columns: state.columns.filter(column => column.id !== id),
       
        })),

    updateColumn: (id: string, updatedFields: Partial<Column>) =>
        set((state) => ({
            columns: state.columns.map((column) =>
                column.id === id ? { ...column, ...updatedFields } : column
            )
        }))
}));