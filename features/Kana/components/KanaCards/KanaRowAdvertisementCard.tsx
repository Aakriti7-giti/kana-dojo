'use client';

import AdSenseDisplay from '@/shared/ui-composite/Ads/AdSenseDisplay';

interface KanaRowAdvertisementCardProps {
  slot: string;
  className?: string;
}

const KanaRowAdvertisementCard = ({
  slot,
  className,
}: KanaRowAdvertisementCardProps) => (
  <section
    className={`transition-250 flex aspect-square flex-col items-center justify-center rounded-3xl border-0 border-(--border-color) bg-(--card-color) p-4 ${className ?? ''}`}
    aria-label='Advertisement'
  >
    <p className='mb-3 text-xs font-medium tracking-wide text-(--secondary-color) uppercase'>
      Advertisement
    </p>
    <div className='flex w-full flex-1 items-center justify-center overflow-hidden'>
      <AdSenseDisplay slot={slot} />
    </div>
  </section>
);

export default KanaRowAdvertisementCard;
