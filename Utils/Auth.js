export const AuthUser = (req, res, next) => {
  const userId = req.body.userId;
  if (!userId) return res.status(401).end("Please login first");
  next();
};
