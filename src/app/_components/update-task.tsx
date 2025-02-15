import { useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { Pencil } from "lucide-react";
import { Priority, Status, Task } from "@/types/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { users } from "@/data/usersData";
import Image from "next/image";

const EditTask = ({ task }: { task: Task }) => {
    const updateTask = useTaskStore((state) => state.updateTask);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState<Priority>(task.priority);
    const [status, setStatus] = useState<Status>(task.status);
    const [assignedUser, setAssignedUser] = useState<string>(
        JSON.stringify(task.assignee)
    );
    const [dueDate, setDueDate] = useState(task.dueDate);

    const handleUpdateTask = () => {
        if (!title.trim() || !description.trim() || !priority || !assignedUser || !status || !dueDate) return;

        const updatedFields = {
            title,
            description,
            status,
            priority,
            assignee: JSON.parse(assignedUser),
            dueDate
        };

        updateTask(task.id, updatedFields);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={(e) => {
                e.stopPropagation()
            }} className="flex items-center gap-2 p-2 w-full">

                <Pencil className="size-4" />
                Edit
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>Modify the task details below</DialogDescription>
                </DialogHeader>
                <Input placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} />

                <Select value={status} onValueChange={(value) => setStatus(value as Status)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="TODO">To Do</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={assignedUser} onValueChange={(value) => setAssignedUser(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Assigned User" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map((user) => (
                            <SelectItem key={user.id} value={JSON.stringify(user)}>
                                <div className="flex gap-2 items-center justify-start group">
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-6 h-6 rounded-full transition-transform duration-200 group-hover:scale-110"
                                        height={200}
                                        width={200}
                                    />
                                    <span>{user.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

                <Button onClick={handleUpdateTask}>Update Task</Button>
            </DialogContent>
        </Dialog>
    );
};

export default EditTask;