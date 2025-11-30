import React from 'react';
import { cn } from '../../lib/utils.js';

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('overflow-auto', className)} {...props}>
    {children}
  </div>
));
ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };

