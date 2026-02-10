const router = require('express').Router()
const {
  create,list,update,Delete,getById
} =require("../controllers/pmscontroller");



router.post("/projects", create);
router.get("/projects", list);
router.get("/projects/:id", getById);
router.patch("/projects/:id/status", update);
router.delete("/projects/:id", Delete);

module.exports = router;
