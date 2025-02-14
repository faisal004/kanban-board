import React from 'react'

const Task=({
    title,
    description,
    status
}: {
    title: string
    description: string
    status: string
}) => {
    return (
        <div
            className=
                'flex items-start justify-between rounded-lg bg-white px-3 py-2 text-gray-900'
                
            
        >
            <div>
                <h3 className='font-medium text-gray-700'>{title}</h3>
                <p className='text-sm font-light text-gray-500'>{description}</p>
                <p className='text-sm font-light text-gray-500'>{status}</p>
            </div>


        </div>
    )
}

export default Task