"use client"
import { useTaskStore } from "@/store/taskStore"
import Task from "./task"
import { Column as Col } from "@/types/types"
import AddTask from "./add-task"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"


const Column = ({
    title,
    status,
    color
}: Col) => {
    const tasks = useTaskStore(state => state.tasks)
    const filteredTasks = tasks.filter(task => task.status === status)
    const dragTask = useTaskStore(state => state.dragTask)
    const updateTaskAfterDrag = useTaskStore(state => state.updateTaskAfterDrag)

    const draggedTask = useTaskStore(state => state.draggedTask)
    const handleDrop = () => {
        if (!draggedTask) return
        updateTaskAfterDrag(draggedTask, status)
        dragTask(null)
    }

    return (
        <section className=' w-[400px]  ' onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}>

            <div className=' h-full w-[400px] bg-black  border-2  overflow-y-auto rounded-md '>
                <div className="flex items-center justify-between  sticky top-0 bg-black/85 z-50 pb-2 px-2">
                    <h2 className={`ml-1  text-2xl font-semibold pb-2 flex items-center gap-3 p-3  `}> <span style={{ backgroundColor: color }} className={` size-4 rounded-full`}> </span> <span>{title} </span>  <span className={`bg-blue-500/80 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full`}>

                        {filteredTasks.length}
                    </span>
                    </h2>
                    <div className="flex items-center gap-1">     <AddTask status={status} />
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-100">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button></div>


                </div>

                <div className='flex flex-col gap-4  p-4'>
                    {filteredTasks.map(task => (
                        <Task key={task.id} {...task} color={color} />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Column