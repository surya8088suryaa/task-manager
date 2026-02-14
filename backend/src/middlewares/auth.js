import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header || !header.startsWith("Bearer")) {
    const err = new Error("Unauthorized Access");
    err.status = 401;
    return next(err);
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};