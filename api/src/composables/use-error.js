const httpStatus = {
  BAD_REQUEST: 400,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export default function useError() {
  const notFoundError = (error) => ({
    status: httpStatus.NOT_FOUND,
    error,
  });

  const unauthorizedError = (error) => ({
    status: httpStatus.UNAUTHORIZED,
    error,
  });

  const badRequestError = (error) => ({
    status: httpStatus.BAD_REQUEST,
    error,
  });

  return {
    notFoundError,
    unauthorizedError,
    badRequestError,
  };
}
