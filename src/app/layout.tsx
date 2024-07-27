import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ReactNode } from 'react';
import '@/styles/globals.css';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: 'Next.js and Prisma ORM Task Manager',
    description:
        'Discover our simple task manager application built with Next.js and Prisma ORM. Manage your tasks efficiently with features to add, update, and delete tasks. Explore the tech stack, installation guide, and more.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
