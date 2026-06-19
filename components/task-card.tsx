import { Badge } from "@/components/ui/badge";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, Clock, Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TaskCardProps {
    task: Task;
    onSelect: (task: Task) => void;
    onStatusChange: (id: string, status: Task["status"]) => void;
}

export function TaskCard({ task, onSelect, onStatusChange }: TaskCardProps) {
    const statusIcons = {
        "done": <Check className="h-4 w-4" />,
        "in-progress": <Clock className="h-4 w-4" />,
        "under-review": <Search className="h-4 w-4" />
    };

    const statusText = {
        "done": "Completed",
        "in-progress": "In Progress",
        "under-review": "Under Review"
    };

    const formattedDate = task.createdAt
        ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })
        : "Recently";

    const getNextStatus = (currentStatus: Task["status"]): Task["status"][] => {
        switch (currentStatus) {
            case "in-progress":
                return ["under-review", "done"];
            case "under-review":
                return ["in-progress", "done"];
            case "done":
                return ["in-progress", "under-review"];
            default:
                return ["in-progress", "under-review", "done"];
        }
    };

    return (
        <div
            className={cn(
                "task-card animate-fade-in cursor-pointer",
                `task-card-${task.status}`
            )}
            onClick={() => onSelect(task)}
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-lg line-clamp-1">{task.title}</h3>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                    <span className="flex items-center gap-1">
                        {statusIcons[task.status]}
                        {statusText[task.status]}
                    </span>
                </Badge>
            </div>
            <p className="text-sm opacity-90 line-clamp-2 mb-2">{task.description}</p>
            <div className="text-xs opacity-75 mt-3">
                Created: {formattedDate}
            </div>

            <div className="flex space-x-1 mt-4" onClick={(e) => e.stopPropagation()}>
                {getNextStatus(task.status).map((status) => (
                    <button
                        key={status}
                        className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-500 rounded"
                        onClick={() => onStatusChange(task._id, status)}
                    >
                        Mark {status.replace("-", " ")}
                    </button>
                ))}
            </div>
        </div>
    );
}