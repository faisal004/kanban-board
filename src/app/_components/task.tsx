import type { Task } from '@/types/types'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Calendar, MoreHorizontal } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from '@/components/ui/badge'

const Task = ({
    title,
    description,
    status,
    priority,
    assignee,
    dueDate
}: Task) => {
    return (
        <Card className="w-full bg-zinc-800 text-white border-zinc-700">
          <CardHeader className="flex-row items-start justify-between space-y-0 p-4 pb-2">
          <Badge  className='flex items-center gap-2 bg-blue-500/40 text-white hover:bg-blue-500/20' >
              <div className="h-2 w-2 rounded-full bg-blue-500 "></div>
              <span className="">{status}</span>
              </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
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
              <span className='text-xs text-zinc-400 flex items-center gap-1'><Calendar className='size-4 '/> {dueDate}</span>
              <Badge variant="destructive" >
                {priority}
              </Badge>
            </div>
          </CardContent>
      
        </Card>
    )
}

export default Task