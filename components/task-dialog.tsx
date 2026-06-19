
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/lib/types";
import { useEffect, useState } from "react";


interface TaskDialogProps {
    task?: Task | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: Partial<Task>) => void;
    onDelete?: (id: string) => void;
}

export function TaskDialog({
    task,
    isOpen,
    onClose,
    onSave,
    onDelete,
}: TaskDialogProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<Task["status"]>("in-progress");
    const [, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || "");
            setStatus(task.status);
        } else {
            setTitle("");
            setDescription("");
            setStatus("in-progress");
        }
    }, [task]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const taskData: Partial<Task> = {
                title: title.trim(),
                description: description.trim(),
                status,
            };

            if (task?._id) {
                taskData._id = task._id;
            }

            await onSave(taskData);
        } catch (error) {
            console.error("Error saving task:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!task?._id) return;

        if (window.confirm("Are you sure you want to delete this task?")) {
            setIsSubmitting(true);
            try {
                if (onDelete) await onDelete(task._id);
            } catch (error) {
                console.error("Error deleting task:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="title" className="text-sm font-medium">
                                Task Title
                            </label>
                            <Input
                                id="title"
                                placeholder="Enter task title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="description" className="text-sm font-medium">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                placeholder="Enter task description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {task && (
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Status</label>
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        type="button"
                                        variant={task?.status === "in-progress" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStatus("in-progress")}
                                        className="flex-1"
                                    >
                                        In Progress
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={task?.status === "under-review" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStatus("under-review")}
                                        className="flex-1"
                                    >
                                        Under Review
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={task?.status === "done" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStatus("done")}
                                        className="flex-1"
                                    >
                                        Completed
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        {task && onDelete && (
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleDelete}
                                className="sm:mr-auto text-white"
                            >
                                Delete Task
                            </Button>
                        )}
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {task ? "Update Task" : "Create Task"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}