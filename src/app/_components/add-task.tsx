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
import { Priority, Status } from "@/types/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AddTask = ({ status }: { status: Status }) => {
    const addTask = useTaskStore((state) => state.addTask);
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("LOW");

    const handleAddTask = () => {
        if (!title.trim() || !description.trim() || !priority) return;
        addTask(title, description, status, priority as Priority);
        setTitle("");
        setDescription("");
        setPriority("LOW")
        setOpen(false)
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={"sm"}>
                    <Plus />
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
                <Button onClick={handleAddTask}>Add Task</Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddTask;
