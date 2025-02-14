import type { Task } from '@/types/types'

const Task = ({
    title,
    description,
    status,
    priority,
    assignee,
    dueDate
}: Task) => {
    return (
        <div
            className=
            'flex items-start justify-between rounded-lg bg-white px-3 py-2 text-gray-900'>
            <div>
                <h3 className='font-medium text-gray-700'>{title}</h3>
                <p className='text-sm font-light text-gray-500'>{description}</p>
                <p className='text-sm font-light text-gray-500'>{status}</p>
                <p className='text-sm font-light text-gray-500'>{priority}</p>
                <p className='text-sm font-light text-gray-500'>{assignee.name}</p>
                <p className='text-sm font-light text-gray-500'>{dueDate}</p>

            </div>
        </div>
    )
}

export default Task