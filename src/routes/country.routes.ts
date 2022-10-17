import express from 'express'
import checkAuth from '../middlewares/auth'

const router = express.Router();

// Import controllers
import * as cCountry from '../controllers/country.controller'

// Routes definitions
router.route('/')
    .get(checkAuth, cCountry.list)
    .post(cCountry.create)

router.route('/:id')
    .get(cCountry.read)
    .put(cCountry.update)
    .delete(cCountry.remove)

// Export
export default router