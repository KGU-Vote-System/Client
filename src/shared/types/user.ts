export type User = {
  kakaoEmail: string;
  name: string;
  collegeMajorName: string;
  studentEmail: string;
  walletAddress: string;
  keyId: string;
  krn: string;
};

export type Token = {
  grantType: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
};
