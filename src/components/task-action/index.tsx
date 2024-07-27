'use client';

import { Task } from '@prisma/client';
import { Delete } from './delete';
import { Edit } from './edit';

export function TaskAction({ task }: { task: Task }) {
    const { id } = task;

    return (
        <div className="flex items-center space-x-2">
            <Edit task={task} />
            <Delete id={id} />
        </div>
    );
}
