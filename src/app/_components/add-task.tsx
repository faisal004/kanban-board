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
import { Plus } from "lucide-react";
import { Priority, Status } from "@/types/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { users } from "@/data/usersData";
import Image from "next/image";
import { Textarea } from "@/components/ui/text-area";

interface FormData {
    title: string;
    description: string;
    priority: Priority;
    assignedUser: string | null;
    dueDate: string;
}

interface FormErrors {
    title?: string;
    description?: string;
    priority?: string;
    assignedUser?: string;
    dueDate?: string;
}

const initialFormData: FormData = {
    title: "",
    description: "",
    priority: "LOW",
    assignedUser: null,
    dueDate: "",
};

const AddTask = ({ status }: { status: Status }) => {
    const addTask = useTaskStore((state) => state.addTask);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
            isValid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
            isValid = false;
        }

        if (!formData.priority) {
            newErrors.priority = "Priority is required";
            isValid = false;
        }

        if (!formData.assignedUser) {
            newErrors.assignedUser = "Please assign a user";
            isValid = false;
        }

        if (!formData.dueDate) {
            newErrors.dueDate = "Due date is required";
            isValid = false;
        } else {
            const selectedDate = new Date(formData.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                newErrors.dueDate = "Due date cannot be in the past";
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    const handleAddTask = () => {
        if (!validateForm()) return;

        addTask(
            formData.title,
            formData.description,
            status,
            formData.priority,
            JSON.parse(formData.assignedUser!),
            formData.dueDate
        );
        
        setFormData(initialFormData);
        setErrors({});
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-100">
                    <Plus className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a New Task</DialogTitle>
                    <DialogDescription>Enter task details below</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Input
                            placeholder="Task Title"
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <Textarea
                            placeholder="Task Description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className={errors.description ? "border-red-500" : ""}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <Input
                        placeholder="Task Title"
                        value={status}
                        disabled
                    />

                    <div>
                        <Select 
                            value={formData.priority} 
                            onValueChange={(value) => handleInputChange("priority", value)}
                        >
                            <SelectTrigger className={`w-full ${errors.priority ? "border-red-500" : ""}`}>
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="HIGH">High</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="LOW">Low</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
                    </div>

                    <div>
                        <Select 
                            value={formData.assignedUser || ""} 
                            onValueChange={(value) => handleInputChange("assignedUser", value)}
                        >
                            <SelectTrigger className={`w-full ${errors.assignedUser ? "border-red-500" : ""}`}>
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
                        {errors.assignedUser && <p className="text-red-500 text-sm mt-1">{errors.assignedUser}</p>}
                    </div>

                    <div>
                        <Input
                            placeholder="Due Date"
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => handleInputChange("dueDate", e.target.value)}
                            className={errors.dueDate ? "border-red-500" : ""}
                            required
                        />
                        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                    </div>

                    <Button onClick={handleAddTask} className="w-full">Add Task</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddTask;