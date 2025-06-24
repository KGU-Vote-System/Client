import { useRef, useState } from 'react';
import { animate, motion } from 'framer-motion';

import { Card } from '@/shared/ui';
import type { Election } from '@/shared/types';
import { getDate } from '@/shared/utils';

export default function CardStack({ data }: { data: Election[] }) {
  const [stack, setStack] = useState<Election[]>(data);
  const [passedCards, setPassedCards] = useState<Election[]>([]);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const currentIndex = data.length - stack.length;

  return (
    <>
      <div className="relative h-[266px] w-full">
        {stack.map((card, index) => {
          const swipeRight = () => {
            if (passedCards.length !== 0) {
              setPassedCards(prev => prev.slice(0, -1));
              animate(
                cardRefs.current[card.id]!,
                { x: 0 },
                { type: 'spring', stiffness: 300 },
              );
              setStack(prev => [passedCards[passedCards.length - 1], ...prev]);
            } else {
              animate(
                cardRefs.current[card.id]!,
                { x: 0 },
                { type: 'spring', stiffness: 300 },
              );
            }
          };

          const swipeLeft = () => {
            if (stack.length === 0) {
              animate(
                cardRefs.current[card.id]!,
                { x: 0 },
                { type: 'spring', stiffness: 300 },
              );
            }
            if (stack.length === 1) {
              animate(
                cardRefs.current[card.id]!,
                { x: 0 },
                { type: 'spring', stiffness: 300 },
              );
              setStack(data);
              setPassedCards([]);
            } else if (stack.length !== 0) {
              setPassedCards(prev => [...prev, stack[0]]);
              setStack(prev => prev.slice(1));
            }
          };

          return (
            <motion.div
              key={card.id}
              drag="x"
              dragElastic={0.4}
              dragConstraints={{ left: -70, right: 70 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) <= 70) {
                  animate(
                    cardRefs.current[card.id]!,
                    { x: 0 },
                    { type: 'spring', stiffness: 300 },
                  );
                } else {
                  if (info.offset.x >= 70) swipeRight();
                  if (info.offset.x < -70) swipeLeft();
                }
              }}
              className="shadow-card absolute flex h-fit w-full cursor-pointer flex-col rounded-lg bg-white p-6"
              style={{
                zIndex: stack.length - index,
                scale: 1 - index * 0.03,
                bottom: index * 14,
                opacity: index === 0 ? 1 : index === 1 ? 0.8 : 0.4,
                visibility: index > 3 ? 'hidden' : 'visible',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1 - index * 0.03,
                opacity: index === 0 ? 1 : index === 1 ? 0.8 : 0.4,
                bottom: index * 14,
              }}
              exit={{ scale: 0, opacity: 0 }}
              ref={el => {
                cardRefs.current[card.id] = el;
              }}
            >
              <Card
                isStackCard
                id={card.id}
                campus={card.campus}
                title={card.title}
                date={`${getDate(card.startAt, 'YYYY.MM.DD')} - ${getDate(card.endAt, 'YYYY.MM.DD')}`}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="mt-[14px] flex w-full justify-center gap-[6px]">
        {data.map((_, idx) => (
          <div
            key={idx}
            className={`h-[6px] rounded-full transition-colors ${
              idx === currentIndex ? 'w-5 bg-blue-500' : 'w-[6px] bg-gray-300'
            }`}
          />
        ))}
      </div>
    </>
  );
}
