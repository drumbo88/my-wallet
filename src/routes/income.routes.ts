import express from 'express'
import checkAuth from '../middlewares/auth'

const router = express.Router();

// Import controllers
import * as cTransaction from '../controllers/transaction.controller'

// Routes definitions
router.route('/')
    .get(cTransaction.list)
    .post(cTransaction.create)

router.route('/:id')
    .get(cTransaction.read)
    .put(cTransaction.update)
    .delete(cTransaction.remove)

// Export
export default router