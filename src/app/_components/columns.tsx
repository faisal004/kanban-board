"use client"
import Column from './column';
import { useColumnStore } from '@/store/columnStore';

const Columns = () => {
  const columns = useColumnStore(state => state.columns);

  return (
    <section className='flex gap-6 overflow-x-auto p-3 h-[calc(100vh-6rem)]'>
      {columns.map(column => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          status={column.status}
          color={column.color}
        />
      ))}
      
   
    </section>
  );
};

export default Columns;
