import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import type { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

type UserMode = {
  mode: 'STUDENT' | 'ADMIN' | '';
};

const initialUserState = {
  mode: '' as const,
};

const sessionStorage = createJSONStorage(() => window.sessionStorage);

export const userModeAtom = atomWithStorage<UserMode>(
  'userMode',
  initialUserState,
  sessionStorage as AsyncStorage<UserMode>,
);
