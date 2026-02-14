export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.user?.role;

    if (!role) {
      const err = new Error("Forbidden: Not Allowed");
      err.status = 403;
      return next(err);
    }
    if (!allowedRoles.includes(role)) {
      const err = new Error("Forbidden: Not Allowed");
      err.status = 403;
      return next(err);
    }
    next();
  };
};