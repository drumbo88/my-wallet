// Import Models
import mongoose from 'mongoose'
import { model as Transaction } from '../models/transaction.js'
import { model as Account } from '../models/account.js'

export const list = async (req, res) => {
    const query = req.params.from ? { fromAccount: req.params.from } : {}
    req.body.idEntity = req.params.id
    try {
        if (req.body.idEntity) {
            query.userEntity = mongoose.Types.ObjectId(req.body.idEntity)
            const accounts = await Account.find(query, '_id')
            const txQuery = { $or: [
                { fromAccount: { $in: accounts } },
                { toAccount: { $in: accounts } }
            ]}
            await Transaction.find(txQuery)
                .populate('fromAccount').populate({ path: 'fromAccount', populate: 'userEntity' })
                .populate('toAccount').populate({ path: 'toAccount', populate: 'userEntity' })
                .populate('concept')
                .then((transactions) => {
                return res.json({transactions, message: `Transactions listed from Entity #${query.userEntity}`})
            })
        }
        else {
            await Transaction.find(query)
                .populate('fromAccount').populate({ path: 'fromAccount', populate: 'userEntity' })
                .populate('toAccount').populate({ path: 'toAccount', populate: 'userEntity' })
                .populate('concept').then((transactions) => {
                return res.json({transactions, message: 'Transactions listed'})
            })
        }
    }
    catch (error) {
        console.log(error)
        res.status(409).json({ message: error })
    }
}
export const create = (req, res) => {
    const {
        date, currency, amount,
        concept, source, destiny,
        detail
    } = req.body
    Transaction.create({
        date, currency, amount,
        concept, source, destiny,
        detail
    })
    .then(doc => res.json({message: `Transaction saved #${doc._id}`}))
    .catch(error => res.status(409).json({ message: error }))
}
export const read = (req, res) => {
    Transaction.findById(req.params.id)
    .then(doc => res.json({obj: doc}))
    .catch(error => res.status(409).json({ message: error }))
}
export const update = (req, res) => {
    const {
        date, currency, amount,
        concept, source, destiny,
        detail
    } = req.body
    Transaction.findByIdAndUpdate(req.params.id, {
        date, currency, amount,
        concept, source, destiny,
        detail
    })
    .then(doc => res.json({message: `Transaction saved #${doc._id}`}))
    .catch(error => res.status(409).json({ message: error }))
}
export const remove = (req, res) => {
    Transaction.findByIdAndDelete(req.params.id).then((doc) => {
        return res.json({message: `Transaction deleted #${doc._id}`})
    })
}
