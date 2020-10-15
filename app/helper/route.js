export const route = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);

    res.send(result);
  } catch (e) {
    next(e);
  }
};