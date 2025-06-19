import { motion } from 'framer-motion';
import { useEffect, type Dispatch, type SetStateAction } from 'react';

interface ProgressBarProps {
  speed?: number;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
}

export default function ProgressBar({
  speed = 60,
  progress,
  setProgress,
}: ProgressBarProps) {
  useEffect(() => {
    if (progress >= 100) return;

    const timeout = setTimeout(() => {
      setProgress(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [progress, speed, setProgress]);

  return (
    <div className="h-1.5 w-full max-w-md overflow-hidden rounded bg-[#edeef0]">
      <motion.div
        className="bg-m h-full"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
    </div>
  );
}
