export type BaseResponse = {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
  };
};
