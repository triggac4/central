export const successResponse = (status, data = null, message = '') => {
  return {
    success: true,
    status,
    data: data,
    message: message.trim().length ? message : 'Request Success',
  };
};

export const failureResponse = (status, message = '') => {
  return {
    success: false,
    status,
    data: null,
    message: message.trim().length ? message : 'Unable to process request',
  };
};
