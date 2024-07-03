export const sendResponse = (success = true, message: any, data: any) => {
  return {
    success,
    message,
    data,
  };
};
