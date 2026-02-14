import Task from "../models/Task.js";

export const checkTaskOwnership = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      const err = new Error("Task Not Found");
      err.status = 404;
      throw err;
    }

    if (req.user.role == "admin") return next();

    if (task.userId.toString() != req.user.userId) {
      const err = new Error("Forbidden: Not Allowed");
      err.status = 403;
      throw err;
    }
    return next();
  } catch (err) {
    next(err);
  }
};