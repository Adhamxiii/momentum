export interface Task {
    _id: string;
    id?: string;
    title: string;
    description: string;
    status: "in-progress" | "under-review" | "done";
    createdAt: string;
    updatedAt?: string;
}

export interface TaskInput {
    title: string;
    description: string;
    status: "in-progress" | "under-review" | "done";
}