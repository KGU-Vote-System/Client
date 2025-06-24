import type { Campus } from './campus';

export type Election = {
  id: number;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  isActive: boolean;
  campus: Campus;
  ownerId: number;
  collageMajorName: string;
};
