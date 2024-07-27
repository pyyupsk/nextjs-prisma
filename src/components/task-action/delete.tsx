import { deleteTask } from '@/action/tasks';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Task } from '@prisma/client';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

export function Delete({ id }: { id: Task['id'] }) {
    const { toast } = useToast();
    const router = useRouter();

    async function handleDelete() {
        try {
            await deleteTask(id);
            router.refresh();
            toast({
                title: 'Success',
                description: 'Your task was deleted.',
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Something went wrong while deleting the task.',
                variant: 'destructive',
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <Trash2 className="mr-1 h-4 w-4" />
                    <span>Delete Task</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your task and remove your data from
                        our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                        Delete
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline" size="sm">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
