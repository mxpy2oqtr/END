import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './button.jsx';
import { cn } from '../../lib/utils.js';

const Dialog = ({ open, onOpenChange, children }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange?.(false)} />
      <div className="relative z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
};

const DialogTrigger = ({ asChild, children, ...props }) => {
  if (asChild) {
    return React.cloneElement(children, props);
  }
  return <button {...props}>{children}</button>;
};

const DialogContent = ({ className, children, ...props }) => (
  <div className={cn('relative', className)} {...props}>
    {children}
  </div>
);

const DialogHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);

const DialogTitle = ({ className, ...props }) => (
  <h2 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
);

const DialogClose = ({ className, ...props }) => (
  <button
    className={cn('absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100', className)}
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
);

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose };

