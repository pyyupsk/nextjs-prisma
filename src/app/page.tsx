import { getTasks } from '@/action/tasks';
import { TaskCreate } from '@/components/task-create';
import { TaskList } from '@/components/task-list';

export default async function Home() {
    const tasks = await getTasks();

    return (
        <main className="container flex flex-col space-y-8 py-20">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Tasks</h1>
                <TaskCreate />
            </div>
            <TaskList tasks={tasks} />
        </main>
    );
}
