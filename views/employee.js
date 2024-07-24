const express = require("express");

const router = express.Router();

const employeeController = require('../controllers/employeeController')


router.post("/addEmployee", employeeController.addEmployee);

router.post("/employeeLogin", employeeController.employeeLogin);

router.get("/employeeFetch/:id", employeeController.employeeFetch);

router.delete("/empDelete/:id", employeeController.employeeDelet)

// router.get('/employees/:id/shifts', employeeController.employeeId)



module.exports = router;

