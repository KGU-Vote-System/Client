import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import type { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

type Token = {
  accessToken: string;
};

type Email = {
  kakaoEmail: string;
};

const initialUserState = {
  accessToken: '',
};

const initialEmailState = {
  kakaoEmail: '',
};

const sessionStorage = createJSONStorage(() => window.sessionStorage);

export const userTokenAtom = atomWithStorage<Token>(
  'userToken',
  initialUserState,
  sessionStorage as AsyncStorage<Token>,
);

export const userEmailAtom = atomWithStorage<Email>(
  'userToken',
  initialEmailState,
  sessionStorage as AsyncStorage<Email>,
);
