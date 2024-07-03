export const isAuthor = (reqUser: string, ownerUser: string) => {
  if (reqUser === ownerUser) return true;
  return false;
};
