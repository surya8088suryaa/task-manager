import Task from "../models/Task.js";

export const createTask = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.user.role !== "admin") {
      payload.userId = req.user.userId;
    } else {
      if (!payload.userId) payload.userId = req.user.userId;
    }
    const task = await Task.create(payload);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    //Pagination /tasks?page=2&limit=10,, /tasks
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "10", 10), 1),
      100,
    );
    const skip = (page - 1) * limit;

    //Filtering
    const filter = {};
    if (req.user.role !== "admin") filter.userId = req.user.userId;
    else {
      if (req.query.userId) filter.userId = req.query.userId;
    }
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;

    //Sorting
    const allowedSortFields = new Set(["createdAt", "dueDate", "priority"]);
    const sortBy = allowedSortFields.has(req.query.sortBy)
      ? req.query.sortBy
      : "createdAt";
    const order = (req.query.order || "desc").toLowerCase() === "asc" ? 1 : -1;
    const sort = { [sortBy]: order }; //{createdAt: 1}

    const [tasks, total] = await Promise.all([
      Task.find(filter).sort(sort).skip(skip).limit(limit),
      Task.countDocuments(filter),
    ]);
    //metadata-> pages, next, previous
    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
      sortBy,
      order: order === 1 ? "asc" : "desc",
      filtersApplied: filter,
      tasks,
    });
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "userId",
      "name email",
    );
    if (!task) {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.user.role !== "admin") {
      delete updates.userId;
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!updatedTask) {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }
    res.json(deletedTask);
  } catch (error) {
    next(error);
  }
};