const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth')

// Import controllers
const cIncome = require('../controllers/income.controller');

// Routes definitions 
router.route('/')
    .get(checkAuth, cIncome.incomeList)
    .post(checkAuth, cIncome.incomeAdd)

router.route('/:id')
    .get(checkAuth, cIncome.incomeView)
    .put(checkAuth, cIncome.incomeModify)
    .delete(checkAuth, cIncome.incomeDelete)

// Export
module.exports = router