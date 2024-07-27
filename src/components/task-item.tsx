import { updateTask } from '@/action/tasks';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Task } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { TaskAction } from './task-action';
import { useToast } from './ui/use-toast';

export function TaskItem({ task }: { task: Task }) {
    const { toast } = useToast();
    const router = useRouter();

    async function toggleTask() {
        try {
            await updateTask({ ...task, completed: !task.completed });
            router.refresh();
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to toggle task',
                variant: 'destructive',
            });
        }
    }

    if (!task) return null;

    return (
        <div className="flex items-center justify-between space-x-4">
            <div className="flex items-start space-x-2">
                <Checkbox id={task.title} checked={task.completed} onCheckedChange={toggleTask} />
                <div className="flex flex-col">
                    <Label htmlFor={task.title} className="font-medium">
                        {task.title}
                    </Label>
                    <small className="text-muted-foreground">{task.description}</small>
                </div>
            </div>
            <TaskAction task={task} />
        </div>
    );
}
