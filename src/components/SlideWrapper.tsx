/**
 * SlideWrapper — wraps each section into a full-screen slide
 */
import { useDeck } from './DeckEngine';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface SlideWrapperProps {
  children: React.ReactNode;
  bg?: string;
  showNextHint?: boolean;
  nextLabel?: string;
  className?: string;
}

export default function SlideWrapper({
  children,
  bg = 'bg-white',
  showNextHint = true,
  nextLabel,
  className = '',
}: SlideWrapperProps) {
  const { next, current, total } = useDeck();
  const isLast = current === total - 1;

  return (
    <div className={`relative w-full min-h-screen flex flex-col ${bg} ${className}`}
      style={{ paddingBottom: '120px' }}
    >
      {/* Main content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Next slide hint */}
      {showNextHint && !isLast && (
        <motion.button
          onClick={next}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors group z-10"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-black">
            {nextLabel || 'Next'}
          </span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={16} />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}
