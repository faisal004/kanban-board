"use client"
import { useTaskStore } from "@/store/taskStore"
import Task from "./task"
import { Columns } from "@/types/types"
import AddTask from "./add-task"


const Column = ({
    title,
    status
}: Columns) => {
    const tasks = useTaskStore(state => state.tasks)
    const filteredTasks = tasks.filter(task => task.status === status)

    return (
        <section className=' w-[350px]  '>

            <div className=' h-full w-[350px]  bg-black border-2  p-4 overflow-y-auto rounded-md'>
                <div className="flex items-center justify-between pb-2">
                    <h2 className='ml-1 font-serif text-2xl font-semibold pb-2'>{title}</h2>
                    <AddTask status={status} />

                </div>

                <div className='flex flex-col gap-4'>
                    {filteredTasks.map(task => (
                        <Task key={task.id} {...task} />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Column