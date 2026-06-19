'use client'

import { FilterBar } from "@/components/filter-bar";
import { TaskCard } from "@/components/task-card";
import { TaskDialog } from "@/components/task-dialog";
import { Toaster } from "@/components/ui/sonner";
import { UserHeader } from "@/components/user-header";
import { Task } from "@/lib/types";
import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/api";
import { toast } from "sonner";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        toast.error("Failed to load tasks. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const counts = {
    all: tasks.length,
    "done": tasks.filter(task => task.status === "done").length,
    "in-progress": tasks.filter(task => task.status === "in-progress").length,
    "under-review": tasks.filter(task => task.status === "under-review").length,
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (selectedTask?._id) {
        const updatedTask = await updateTask(selectedTask._id, taskData);
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
        toast.success("Task updated successfully");
      } else {
        const newTask = await createTask(taskData as Task);
        setTasks(prevTasks => [...prevTasks, newTask]);
        toast.success("Task created successfully");
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to save task:", error);
      toast.error("Failed to save task. Please try again.");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      setIsDialogOpen(false);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleStatusChange = async (id: string, status: Task["status"]) => {
    try {
      const updatedTask = await updateTask(id, { status });
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === id ? { ...task, status: updatedTask.status } : task
        )
      );
      toast.success(`Task marked as ${status}`);
    } catch (error) {
      console.error("Failed to update task status:", error);
      toast.error("Failed to update task status. Please try again.");
    }
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setIsDialogOpen(true);
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <UserHeader />

      <FilterBar
        activeFilter={filter}
        onFilterChange={setFilter}
        counts={counts}
      />

      <div className="px-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex space-x-4">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 pb-20">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onSelect={handleSelectTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-xl font-medium">No tasks found</h3>
            <p className="text-muted-foreground mt-2">
              {filter === "all"
                ? "You don't have any tasks yet. Create your first task!"
                : `You don't have any ${filter} tasks.`}
            </p>
          </div>
        )}
      </div>

      <TaskDialog
        task={selectedTask}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />

      <Toaster />

      <button
        className="fixed bottom-6 right-6 h-14 w-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        onClick={handleNewTask}
        aria-label="Add new task"
      >
        <span className="text-2xl">+</span>
      </button>
    </div>
  );
}