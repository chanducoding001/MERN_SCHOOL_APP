const { getAllUsers } = require("../controllers/getUsersController");

const router = require("express").Router();

router.get('/',getAllUsers)

module.exports = router;
