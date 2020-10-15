export const middleware = (fn) => async (req, res, next) => {
  try {
    await fn(req);

    next();
  } catch (e) {
    next(e);
  }
};