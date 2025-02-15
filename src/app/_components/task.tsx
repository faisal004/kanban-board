import type { Task } from '@/types/types'
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Calendar, MoreHorizontal, Trash } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropDownMenu"
import { useTaskStore } from '@/store/taskStore'
import EditTask from './update-task'
import { formatDate } from '@/utils/formatDate'

interface TaskWithColor extends Task {
    color: string
}

const Task = ({
    id,
    title,
    description,
    status,
    priority,
    assignee,
    dueDate,
    color
}: TaskWithColor) => {
    const removeTask = useTaskStore(state => state.removeTask)
    const dragTask = useTaskStore(state => state.dragTask)
    const hexToRgba = (hex: string, opacity: number) => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };
    const getVariant = (priority: string) => {
        switch (priority.toLowerCase()) {
            case "high":
                return "destructive";
            case "medium":
                return "warning";
            case "low":
                return "success";
            default:
                return "secondary";
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="w-full bg-zinc-800 text-white border-zinc-700  hover:border-zinc-400 cursor-move hover:scale-[1.02] transition-all duration-300" draggable onDragStart={() => dragTask(id)}>
                <CardHeader className="flex-row items-start justify-between space-y-0 p-4 pb-2">
                    <Badge
                        style={{ backgroundColor: hexToRgba(color, 0.4) }}
                        className="flex items-center gap-2 text-white"
                    >
                        <div style={{ backgroundColor: color }} className="h-2 w-2 rounded-full"></div>
                        <span>{status}</span>
                    </Badge>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild><EditTask task={{ id, title, description, status, priority, assignee, dueDate }} />
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => removeTask(id)} className='bg-red-900 hover:bg-red-950'> <Trash /> Delete</DropdownMenuItem>


                        </DropdownMenuContent>
                    </DropdownMenu>


                </CardHeader>
                <CardContent className="space-y-2 px-4">
                    <div>
                        <h3 className="font-semibold line-clamp-1">{title}</h3>
                        <p className="text-sm text-zinc-400 line-clamp-2">{description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-100">Assignee</span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={assignee.avatar} />
                                        <AvatarFallback>{assignee.name}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{assignee.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className='text-xs text-zinc-400 flex items-center gap-1'><Calendar className='size-4 ' /> {formatDate(dueDate)}</span>
                        <Badge variant={getVariant(priority)} >
                            {priority}
                        </Badge>
                    </div>
                </CardContent>

            </Card>
        </motion.div>
    )
}

export default Task