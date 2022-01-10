export const SAMPLE_USER = "SAMPLE";

let userName: string;
let isAdmin: boolean;

export const setAppUser = (user: any): void => {
  const { attributes } = user;
  const groups =
    user?.signInUserSession?.idToken?.payload?.["cognito:groups"] || [];
  setUserName(attributes.email);
  isAdmin = groups.includes("Admins");
};

export const setUserName = (v: string): void => {
  userName = v;
};

const UNIQUE_USER_IDENTIFIER_KEY = "graduationROI.uniqueUserIdentifier";
const getUniqueUserIdentifier = (): string => {
  const existingUniqueUserIdentifier = localStorage.getItem(
    UNIQUE_USER_IDENTIFIER_KEY
  );
  if (existingUniqueUserIdentifier) {
    return existingUniqueUserIdentifier;
  }
  const uid = Math.floor(Math.random() * 1000000000).toString();
  localStorage.setItem(UNIQUE_USER_IDENTIFIER_KEY, uid);
  return uid;
};

export const getUserName = (): string => {
  if (!isInSampleUserMode()) {
    return userName;
  }
  return getUniqueUserIdentifier();
};

export const isInSampleUserMode = (): boolean => {
  return userName === SAMPLE_USER;
};

export const isAdminMode = (): boolean => {
  return !!isAdmin;
};
