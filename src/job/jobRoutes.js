const { Router } = require("express");
const {
  addJob,
  updateJob,
  deleteJob,
  listAllJobs,
  listFilteredJobs,
  updateVisibility,
  searchByJobTitle,
  updateMessages,
} = require("./jobControllers");
const jobRouter = Router();

jobRouter.post("/jobs", addJob);
jobRouter.put("/jobs", updateJob);
jobRouter.delete("/jobs/:userid", deleteJob);
jobRouter.get("/jobs/list", listAllJobs);
jobRouter.post("/jobs/filtered", listFilteredJobs);
jobRouter.patch("/jobs", updateVisibility);
jobRouter.patch("/jobs/messages", updateMessages);
jobRouter.post("/jobs/search", searchByJobTitle);


module.exports = jobRouter;