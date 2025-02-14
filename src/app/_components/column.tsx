import Task from "./task"

const tasks = [
    {
        id: '1234',
        title: 'Our first task',
        description: 'Some description',
        status: 'TODO'
    }
]

export default function Column({
    title,
    status
}: {
    title: string
    status: string
}) {
    const filteredTasks = tasks.filter(task => task.status === status)

    return (
        <section className=' flex-1'>

            <div className='mt-3.5 h-full w-full flex-1 rounded-xl bg-zinc-700/50 border-2 border-zinc-600 p-4'>
                <h2 className='ml-1 font-serif text-2xl font-semibold pb-2'>{title}</h2>

                <div className='flex flex-col gap-4'>
                    {filteredTasks.map(task => (
                        <Task key={task.id} {...task} />
                    ))}
                </div>
            </div>
        </section>
    )
}