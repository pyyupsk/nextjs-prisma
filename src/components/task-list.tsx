'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@prisma/client';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { TaskCreate } from './task-create';
import { TaskItem } from './task-item';
import { Input } from './ui/input';

type TaskSelectProps = 'all' | 'incomplete' | 'completed';

export function TaskList({ tasks }: { tasks: Task[] }) {
    const [filter, setFilter] = useState<TaskSelectProps>('all');
    const [search, setSearch] = useState<string>('');

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesFilter =
                filter === 'all' ||
                (filter === 'incomplete' && !task.completed) ||
                (filter === 'completed' && task.completed);
            const matchesSearch =
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.description!.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [tasks, filter, search]);

    return (
        <div className="flex flex-col rounded-lg border bg-background p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Label className="text-muted-foreground">Filter</Label>
                    <Select onValueChange={(value: TaskSelectProps) => setFilter(value)} defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select filter option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="incomplete">Incomplete</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <Label className="text-muted-foreground">Search</Label>
                    <Input
                        type="text"
                        value={search}
                        rightIcon={Search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tasks..."
                    />
                </div>
            </div>
            {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
            {!filteredTasks.length && (
                <div className="flex flex-col items-center justify-center min-h-[200px] text-muted-foreground">
                    <p className="mb-2">No tasks found.</p>
                    <small>Try to clear your filters, and search or create a new task!</small>
                    <TaskCreate variant="link" />
                </div>
            )}
        </div>
    );
}
