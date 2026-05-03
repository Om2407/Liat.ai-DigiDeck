import React, { useEffect, useRef } from 'react';
import { animate } from 'motion/react';

interface CountUpProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
  isPercent?: boolean;
  isDecimals?: boolean;
  className?: string;
}

export default function CountUp({
  value,
  duration = 1.5,
  delay = 0,
  prefix = '',
  suffix = '',
  isCurrency = false,
  isPercent = false,
  isDecimals = false,
  className = ''
}: CountUpProps) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = countRef.current;
    if (!node) return;

    let displayValue: string | number = 0;
    
    // Initial display
    if (isCurrency) {
      displayValue = '0';
    } else if (isPercent) {
      displayValue = isDecimals ? '0.0' : '0';
    } else {
      displayValue = isDecimals ? '0.0' : '0';
    }
    node.textContent = `${prefix}${isCurrency ? '$' : ''}${displayValue}${isPercent && !suffix ? '%' : ''}${suffix}`;

    const timeout = setTimeout(() => {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (v) => {
          let formattedValue = '';
          
          if (isCurrency) {
            formattedValue = '$' + Math.round(v).toLocaleString('en-US');
          } else if (isPercent) {
            formattedValue = (isDecimals ? v.toFixed(1) : Math.round(v)) + '%';
          } else if (isDecimals) {
            formattedValue = v.toFixed(1);
          } else {
            formattedValue = Math.round(v).toLocaleString('en-US');
          }
          
          node.textContent = `${prefix}${formattedValue}${suffix}`;
        }
      });
      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [value, duration, delay, prefix, suffix, isCurrency, isPercent, isDecimals]);

  return <span ref={countRef} className={className} />;
}
