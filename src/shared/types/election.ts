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

export type Candidate = {
  id: number;
  name: string;
  electionId: number;
  voteCount: number;
};

export type Nominee = {
  id: number;
  name: string;
  studentId: string;
  college: string;
  department: string;
  description: string;
  candidateId: number;
  main: boolean;
};

export type Pledge = {
  id: number;
  description: string;
  candidateId: number;
};
