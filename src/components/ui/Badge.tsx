import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'sale' | 'bestseller' | 'limited' | 'default';
  className?: string;
}

const variants = {
  new: 'bg-brand-blue/20 text-brand-blue border-brand-blue/30',
  sale: 'bg-red-500/20 text-red-400 border-red-500/30',
  bestseller: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  limited: 'bg-brand-purple/20 text-brand-purple-light border-brand-purple/30',
  default: 'bg-white/10 text-white/70 border-white/20',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide border',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
