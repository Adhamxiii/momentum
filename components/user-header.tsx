import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export function UserHeader() {
    return (
        <div className="flex justify-between items-center px-4 py-4">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <h2 className="font-medium">Welcome back</h2>
                    <p className="text-sm text-muted-foreground">Your tasks</p>
                </div>
            </div>
        </div>
    );
}