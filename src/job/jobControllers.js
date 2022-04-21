const JOB = require("./jobModel");

exports.addJob = async (req, res) => {
  try {
    const newJob = await JOB.create(req.body);
    res.status(200).send({ jobRole: newJob });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.listAllJobs = async (req, res) => {
  try {
    const jobs = await JOB.find({});
    res.status(200).send({ jobs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.listFilteredJobs = async (req, res) => {
  try {
    const jobs = await JOB.find({
      [req.body.filterKey]: req.body.filterVal,
    });
    res.status(200).send({ jobs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.updateVisibility = async (req, res) => {
  try {
    const updatedVisibity = await JOB.updateOne(
      { [req.body.filterKey]: req.body.filterVal },
      { [req.body.updateKey]: req.body.updateVal }
    );

    if (updatedVisibity.modifiedCount > 0) {
      res.status(200).send({ msg: "Successfully updated job role" });
    } else {
      throw new Error("Did not update");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const filter = { _id: req.body.id };
    const update = req.body.data;
    const options = { new: true };

    const updatedJob = await JOB.findOneAndUpdate(filter, update, options);

    if (updatedJob) {
      res.status(200).send({ msg: "Successfully updated job details" });
    } else {
      throw new Error("Did not update");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.updateMessages = async (req, res) => {
  try {
    const updatedVisibity = await JOB.updateOne(
      { [req.body.filterKey]: req.body.filterVal },
      { [req.body.updateKey]: req.body.updateVal }
    );

    if (updatedVisibity.modifiedCount > 0) {
      res.status(200).send({ msg: "Successfully updated messages" });
    } else {
      throw new Error("Did not update");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.searchByJobTitle = async (req, res) => {
  try {
    const jobs = await JOB.find({
      [req.body.filterKey]: { $regex: req.body.filterVal },
    });
    res.status(200).send({ jobs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const result = await JOB.deleteMany({ jobId: req.params.jobid });

    if (result && result.deletedCount > 0) {
      res.status(200).send({ msg: `job has been removed` });
    } else {
      throw new Error("job has not been removed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};