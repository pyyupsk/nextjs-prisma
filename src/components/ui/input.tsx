import { cn } from '@/lib/utils';
import * as React from 'react';
import { ElementType } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: ElementType;
    rightIcon?: ElementType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, leftIcon: LeftIcon, rightIcon: RightIcon, ...props }, ref) => {
        return (
            <div className="relative flex items-center max-w-2xl">
                {LeftIcon && <LeftIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />}
                {RightIcon && <RightIcon className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />}
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        LeftIcon && 'pl-8',
                        RightIcon && 'pr-8',
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    },
);
Input.displayName = 'Input';

export { Input };
