const router = require('express').Router()
const {
  create,list,update,Delete,getById
} =require("../controllers/pmscontroller");



router.post("/projects", create); //***** Create project route */
router.get("/projects", list); //***** list project route */
router.get("/projects/:id", getById); //***** Get project By ID route */
router.patch("/projects/:id/status", update); //***** Update project route */
router.delete("/projects/:id", Delete); //***** Delete project route */

module.exports = router;
