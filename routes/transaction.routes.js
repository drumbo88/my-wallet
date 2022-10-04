import express from 'express';
import checkAuth from '../middlewares/auth.js'

const router = express.Router();

// Import controllers
import * as cTransaction from '../controllers/transaction.controller.js'

// Routes definitions
router.route('/:from?')
    .get(cTransaction.list)
    .post(checkAuth, cTransaction.create)

router.route('/:id')
    .get(checkAuth, cTransaction.read)
    .put(checkAuth, cTransaction.update)
    .delete(checkAuth, cTransaction.remove)

// Export
export default router