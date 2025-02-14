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
import { Plus } from "lucide-react";
import {  Priority, Status } from "@/types/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { users } from "@/data/usersData";
import Image from "next/image";

const AddTask = ({ status }: { status: Status }) => {
    const addTask = useTaskStore((state) => state.addTask);
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("LOW");
    const [assignedUser, setAssignedUser] = useState<string | null>(null);
    const [dueDate, setDueDate] = useState<string>("" );

    const handleAddTask = () => {
        if (!title.trim() || !description.trim() || !priority || !assignedUser || !dueDate) return;
        addTask(title, description, status, priority as Priority, JSON.parse(assignedUser),dueDate);
        setTitle("");
        setDescription("");
        setPriority("LOW")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                    <Plus  className="size-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a New Task</DialogTitle>
                    <DialogDescription>Enter task details below</DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    placeholder="Task Title"
                    value={status}
                    disabled
                />
                <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                    <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={assignedUser as string} onValueChange={(value) => setAssignedUser(value as string)}>
                    <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Assigned User" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map((user) => (
                            <SelectItem key={user.id} value={JSON.stringify(user)} >
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
                <Input
                    placeholder="Due Date"
                    type="date"
                    value={dueDate as string}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <Button onClick={handleAddTask}>Add Task</Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddTask;
