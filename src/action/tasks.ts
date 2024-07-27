'use server';

import { prisma } from '@/db';
import { Task } from '@prisma/client';

export async function getTasks() {
    const tasks = await prisma.task.findMany();
    return tasks;
}

export async function createTask(task: Omit<Task, 'id'>) {
    const newTask = await prisma.task.create({ data: task });
    return newTask;
}

export async function updateTask(task: Task) {
    const updatedTask = await prisma.task.update({ where: { id: task.id }, data: task });
    return updatedTask;
}

export async function deleteTask(id: Task['id']) {
    const deletedTask = await prisma.task.delete({ where: { id: id } });
    return deletedTask;
}
