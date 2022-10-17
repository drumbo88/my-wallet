import express from 'express'
import checkAuth from '../middlewares/auth'

const router = express.Router();

// Import controllers
import * as cCurrency from '../controllers/currency.controller'

// Routes definitions
router.route('/')
    .get(cCurrency.list)
    .post(cCurrency.create)

router.route('/:id')
    .get(cCurrency.read)
    .put(cCurrency.update)
    .delete(cCurrency.remove)

// Export
export default router