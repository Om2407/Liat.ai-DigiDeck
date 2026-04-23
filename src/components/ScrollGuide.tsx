import { motion } from 'motion/react';

const SECTIONS = [
  { id: 'hero',          label: 'Home' },
  { id: 'overview',      label: 'Overview' },
  { id: 'parks',         label: 'Parks' },
  { id: 'retail',        label: 'Retail' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'marvel',        label: 'Marvel' },
  { id: 'events',        label: 'Events' },
  { id: 'dining',        label: 'Dining' },
  { id: 'contact',       label: 'Contact' },
];

export default function ScrollGuide({ activeSection }: { activeSection: string }) {
  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {SECTIONS.map((s) => {
        const isActive = activeSection === s.id;
        return (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
            title={s.label}
            className="relative flex items-center justify-end gap-3 group"
          >
            {/* Label tooltip */}
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 8 }}
              className="text-[9px] font-black uppercase tracking-widest text-zinc-500 whitespace-nowrap"
            >
              {s.label}
            </motion.span>

            {/* Dot */}
            <motion.div
              animate={{
                width: isActive ? 20 : 6,
                backgroundColor: isActive ? '#3b82f6' : '#d4d4d8',
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          </button>
        );
      })}
    </nav>
  );
}
