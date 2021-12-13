export const SAMPLE_USER = "SAMPLE";

let userName: string;

export const setUserName = (v: string): void => {
  userName = v;
};

export const getUserName = (): string => {
  return userName;
};

export const isInSampleUserMode = (): boolean => {
  return userName === SAMPLE_USER;
};
