import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import type { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

type Token = {
  accessToken: string;
};

const initialUserState = {
  accessToken: '',
};

const sessionStorage = createJSONStorage(() => window.sessionStorage);

export const userTokenAtom = atomWithStorage<Token>(
  'userToken',
  initialUserState,
  sessionStorage as AsyncStorage<Token>,
);
