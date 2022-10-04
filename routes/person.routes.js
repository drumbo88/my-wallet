import express from 'express';
import checkAuth from '../middlewares/auth.js'

const router = express.Router();

// Import controllers
//import * as cPerson from '../controllers/person.controller.js'
import * as cTransaction from '../controllers/transaction.controller.js'
const cPerson = {}

// Routes definitions
/*router.route('/')
    .get(cPerson.list)
    .post(checkAuth, cPerson.create)

router.route('/:id')
    .get(checkAuth, cPerson.read)
    .put(checkAuth, cPerson.update)
    .delete(checkAuth, cPerson.remove)*/

router.route('/:id/transactions')
    .get(cTransaction.list)

// Export
export default router