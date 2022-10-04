import express from 'express'
import checkAuth from '../middlewares/auth.js'

const router = express.Router();

// Import controllers
import cTransaction from '../controllers/transaction.controller.js'

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