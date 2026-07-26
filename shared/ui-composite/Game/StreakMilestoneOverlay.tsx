'use client';

import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame } from 'lucide-react';
import { cn } from '@/shared/utils/utils';
import { useThemePreferences } from '@/features/Preferences';
import { GameBottomBar } from '@/shared/ui-composite/Game/GameBottomBar';
import BottomBar from '@/shared/ui-composite/layout/BottomBar';

const Decorations = lazy(
  () => import('@/shared/ui-composite/Decorations/Decorations'),
);

interface StreakMilestoneOverlayProps {
  milestone: number | null;
  onDismiss: () => void;
}

const layerVariants = {
  hidden: { opacity: 0, x: 120 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 30, mass: 0.85 },
      opacity: { duration: 0.24 },
    },
  },
  exit: {
    opacity: 0,
    x: -140,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 30, mass: 0.85 },
      opacity: { duration: 0.2 },
    },
  },
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 280,
      damping: 24,
      mass: 0.9,
    },
  },
};

export default function StreakMilestoneOverlay({
  milestone,
  onDismiss,
}: StreakMilestoneOverlayProps) {
  const { isGlassMode } = useThemePreferences();

  useEffect(() => {
    if (!milestone) return;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 180);
  }, [milestone]);

  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          key={`streak-${milestone}`}
          variants={layerVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='fixed inset-0 z-70 flex h-full w-full items-center justify-center bg-(--background-color)'
          role='dialog'
          aria-modal='true'
          aria-label={`${milestone} in a row`}
        >
          {!isGlassMode && (
            <div className='absolute inset-0 -z-10'>
              <Suspense fallback={<></>}>
                <Decorations
                  expandDecorations={false}
                  interactive={false}
                  context='streak-milestone'
                />
              </Suspense>
            </div>
          )}

          {/* Main Content */}
          <motion.div
            variants={contentVariants}
            initial='hidden'
            animate='visible'
            className='mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-6 pb-28 text-center select-none sm:pb-24'
          >
            <motion.button
              variants={itemVariants}
              className={cn(
                'inline-flex h-28 w-28 items-center justify-center rounded-4xl border-b-20 border-(--secondary-color-accent) bg-(--secondary-color) text-(--background-color) transition-all duration-200',
                'motion-safe:animate-float [--float-distance:-8px]',
              )}
            >
              <Flame className='h-16 w-16' strokeWidth={2.5} />
            </motion.button>

            <motion.h2
              variants={itemVariants}
              className='text-4xl font-semibold tracking-tighter text-(--main-color) sm:text-5xl'
            >
              {milestone} in a row!
            </motion.h2>

            {/*
            <motion.p
              variants={itemVariants}
              className='max-w-2xl text-xl font-semibold text-(--secondary-color) sm:text-2xl'
            >
              {message}
            </motion.p>
*/}
            {/* <motion.p
              variants={itemVariants}
              className='text-sm text-(--secondary-color)/80'
            >
              (use Continue to resume)
            </motion.p> */}
          </motion.div>
          <GameBottomBar
            state='check'
            canCheck={true}
            feedbackContent={null}
            actionLabel='continue'
            onAction={onDismiss}
          />
          <BottomBar />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
