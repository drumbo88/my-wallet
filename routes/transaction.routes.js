const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth')

// Import controllers
const cTransaction = require('../controllers/transaction.controller');

// Routes definitions 
router.route('/')
    .get(checkAuth, cTransaction.list)
    .post(checkAuth, cTransaction.create)

router.route('/:id')
    .get(checkAuth, cTransaction.read)
    .put(checkAuth, cTransaction.update)
    .delete(checkAuth, cTransaction.delete)

// Export
module.exports = router