import type { Comment, Task } from '@/types/types'
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Calendar, MessageSquare, MoreHorizontal, Trash } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropDownMenu"
import { useTaskStore } from '@/store/taskStore'
import EditTask from './update-task'
import { formatDate } from '@/utils/formatDate'
import { hexToRgba } from '@/utils/hexToRgba';
import { getVariant } from '@/utils/get-badge-variant';
import { useState } from 'react'
import { Textarea } from '@/components/ui/text-area';
import CommentSection from './commentSection';

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
    color,
    comments
}: TaskWithColor) => {
    const removeTask = useTaskStore(state => state.removeTask)
    const dragTask = useTaskStore(state => state.dragTask)
    const addComment = useTaskStore((state) => state.addComment);

    const [showDetails, setShowDetails] = useState(false)
    const [comment, setComment] = useState('');
    const handleAddComment = () => {
        if (!comment.trim()) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            userId: 'current-user',
            userName: 'Current User',
            content: comment,
            timestamp: new Date().toISOString(),
        };

        addComment(id, newComment);
        setComment('');
    };
    const handleDragStart = (e: React.DragEvent) => {
        e.stopPropagation()
        dragTask(id)
    }
    const handleCardClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget || e.target instanceof Element && e.currentTarget.contains(e.target)) {
            const isDropdownClick = e.target instanceof Element && (
                e.target.closest('button') ||
                e.target.closest('.dropdown-menu') ||
                e.target.closest('dialog')
            );

            if (!isDropdownClick) {
                setShowDetails(true)
            }
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card
                className="w-full bg-zinc-800 text-white cursor-pointer hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:shadow-zinc-700 transition-all duration-300 border-zinc-800"
                draggable
                onDragStart={handleDragStart}
                onClick={handleCardClick}            >
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
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-zinc-400"
                                onClick={(e) => e.stopPropagation()} // Prevent modal from opening
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <EditTask task={{ id, title, description, status, priority, assignee, dueDate }} />
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeTask(id)
                                }}
                                className='dark:bg-red-900 dark:hover:bg-red-950 hover:bg-red-200'>
                                <Trash /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="space-y-2 px-4">
                    <div>
                        <h3 className="font-semibold line-clamp-1">{title}</h3>
                        <p className="text-sm text-zinc-400 line-clamp-1">{description}</p>
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
                        <span className='text-xs text-zinc-400 flex items-center gap-1'>
                            <Calendar className='size-4' /> {formatDate(dueDate)}
                        </span>
                        <Badge variant={getVariant(priority)}>
                            {priority}
                        </Badge>
                    </div>
                </CardContent>

                <CardFooter className="border-t-2 border-zinc-600 flex items-center justify-start pt-2 pb-3">
                    <div className="mt-2 flex items-center gap-2 text-zinc-400">
                        <MessageSquare className="w-4 h-4 " /> 
                        <span>
                            {comments?.length === 1 ? "1 Comment" : `${comments?.length || 0} Comments`}
                        </span>
                    </div>
                </CardFooter>

            </Card>

            <Dialog open={showDetails} onOpenChange={setShowDetails}>
                <DialogContent className="bg-zinc-900 text-white max-w-7xl grid md:grid-cols-2 grid-cols-1 gap-3 max-h-[600px] overflow-auto">
                    <div className='flex flex-col space-y-5'>
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold text-zinc-400 mb-2">Description</h4>
                                <p className="text-zinc-100">{description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-zinc-400 mb-2">Status</h4>
                                    <Badge
                                        style={{ backgroundColor: hexToRgba(color, 0.4) }}
                                        className="flex items-center gap-2 text-white w-fit"
                                    >
                                        <div style={{ backgroundColor: color }} className="h-2 w-2 rounded-full"></div>
                                        <span>{status}</span>
                                    </Badge>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-zinc-400 mb-2">Priority</h4>
                                    <Badge variant={getVariant(priority)}>
                                        {priority}
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-zinc-400 mb-2">Assignee</h4>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={assignee.avatar} />
                                        <AvatarFallback>{assignee.name}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-zinc-100">{assignee.name}</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-zinc-400 mb-2">Due Date</h4>
                                <span className="text-zinc-100 flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(dueDate)}
                                </span>
                            </div>
                        </div>
                        <DialogFooter className="grid grid-cols-1 gap-2 mt-2 border-t-2 pt-4">
                            <Textarea

                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
className='text-black dark:text-white'
                                placeholder="Add a comment..."
                            />
                            <Button
                                onClick={handleAddComment}
                                size={"sm"}
                            >
                                Add
                            </Button>
                        </DialogFooter>
                    </div>
                    <CommentSection comments={comments} />

                </DialogContent>
            </Dialog>
        </motion.div>
    )
}

export default Task