'use client';

import { updateTask } from '@/action/tasks';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@prisma/client';
import { PenLine } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const formSchema = z.object({
    id: z.number(),
    title: z.string().min(1, 'Title is required').max(50, 'Title is too long (50 characters max)'),
    description: z.string().max(200, 'Description is too long (200 characters max)'),
    completed: z.boolean().default(false),
});

export function Edit({ task }: { task: Task }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: task.id,
            title: task.title,
            description: task.description || '',
            completed: task.completed,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateTask(values);
            form.reset();
            // router.refresh(); <-- If you refresh the page using the router, the dialog data will not update when reopened.
            window.location.reload();
            toast({
                title: 'Success',
                description: `Your task "${values.title}" was updated.`,
            });
            setDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Something went wrong while updating the task.',
                variant: 'destructive',
            });
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <PenLine className="mr-1 h-4 w-4" />
                    <span>Edit Task</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit your task</DialogTitle>
                    <DialogDescription>Fill in the details below to edit your task.</DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="required">Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Sleep after work..." {...field} />
                                        </FormControl>
                                        <FormDescription>This is your task&apos;s title.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="optional">Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Become more productive..." {...field} />
                                        </FormControl>
                                        <FormDescription>This is your task&apos;s description.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="completed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                <Label className="optional">Mark as completed</Label>
                                            </div>
                                        </FormControl>
                                        <FormDescription>Mark a task as completed by default.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end space-x-2">
                                <DialogClose asChild>
                                    <Button type="reset" variant="outline" disabled={form.formState.isSubmitting}>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
