import { type ReactNode } from 'react';

import { cn } from '../utils';
import type { BottomSheetItem } from '../types';
import { useBottomSheet } from '../hook';

interface BottomSheetProps {
  children: ReactNode;
  sheetKey: BottomSheetItem;
}

export default function BottomSheet({ children, sheetKey }: BottomSheetProps) {
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { isVisible } = bottomSheetState(sheetKey);
  const onClose = () => closeBottomSheet(sheetKey);

  return (
    <>
      <div
        className={cn('overlay', isVisible && 'overlay-visible')}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed bottom-0 left-0 z-400 flex h-fit w-full flex-col rounded-t-[32px] bg-white px-[40px] pt-8 pb-18 shadow-lg transition-transform duration-300',
          isVisible ? 'translate-y-0' : 'translate-y-full',
          isVisible ? 'box-shadow-bottom-sheet block' : '',
        )}
      >
        {children}
      </div>
    </>
  );
}
