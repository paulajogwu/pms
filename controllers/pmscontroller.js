const Project = require("../models/pmsModel")

//***** Create project method */

exports.create = async (req, res) => {
  try {
    const { name, clientName, status, startDate, endDate } = req.body;

    if (!name || !clientName || !startDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (endDate && new Date(endDate) < new Date(startDate)) {
      return res
        .status(400)
        .json({ message: "endDate cannot be before startDate" });
    }

    const project = await Project.create({
      name,
      clientName,
      status,
      startDate,
      endDate,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//***** List and Filter project method */

exports.list = async (req, res) => {
  try {
    const { status, search, sort = "createdAt" } = req.query;

    const filter = { isDeleted: false };

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { clientName: { $regex: search, $options: "i" } },
      ];
    }

    const allowedSorts = ["createdAt", "startDate"];
    const sortField = allowedSorts.includes(sort) ? sort : "createdAt";

    const projects = await Project.find(filter).sort({ [sortField]: -1 });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//***** get project by ID method */

exports.getById = async (req, res) => {
  try {
    const project = await Project.findOne({
      id: req.params.id,
      isDeleted: false,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//***** Update project method */
exports.update = async (req, res) => {
  try {
    const { status: newStatus } = req.body;

    const project = await Project.findOne({
      id: req.params.id,
      isDeleted: false,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const allowed = validTransitions[project.status];

    if (!allowed.includes(newStatus)) {
      return res.status(400).json({
        message: `Invalid status transition from ${project.status} to ${newStatus}`,
      });
    }

    project.status = newStatus;
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//***** Soft delete project method */
exports.Delete = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


