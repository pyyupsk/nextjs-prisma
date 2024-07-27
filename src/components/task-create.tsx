'use client';

import { createTask } from '@/action/tasks';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export const formSchema = z.object({
    title: z.string().min(1, 'Title is required').max(50, 'Title is too long (50 characters max)'),
    description: z.string().max(200, 'Description is too long (200 characters max)'),
    completed: z.boolean().default(false),
});

type Props = {
    variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
};

export function TaskCreate({ variant = 'default' }: Props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            completed: false,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createTask(values);
            form.reset();
            router.refresh();
            toast({
                title: 'Success',
                description: `Your task "${values.title}" was created.`,
            });
            setDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Something went wrong while creating the task.',
                variant: 'destructive',
            });
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={variant} onClick={() => setDialogOpen(true)}>
                    New Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new task</DialogTitle>
                    <DialogDescription>Fill in the details below to create your new task.</DialogDescription>
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
                                    Create task
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
