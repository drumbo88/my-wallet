// Import Models
import { Transaction } from '../models/Transaction'
import { Account } from '../models/Account'
import { Entity } from '../models/Entity'

export const list = async (req, res) => {
    const query: any = req.params.from ? { from: { account: req.params.from } } : {}
    req.body.idEntity = req.params.id
    try {
        if (req.body.idEntity) {
            query.userEntity = Entity.findOne({ _id: req.body.idEntity })
            const accounts = await Account.find(query, '_id')
            const txQuery = { $or: [
                { from: { account: { $in: accounts } } },
                { to: { account: { $in: accounts } } }
            ]}
            await Transaction.find(txQuery)
                .populate('from.account')/*.populate({ path: 'fromAccount', populate: 'userEntity' })*/
                .populate('to.account')/*.populate({ path: 'toAccount', populate: 'userEntity' })*/
                //.populate('concept')
                .then((transactions) => {
                return res.json({transactions, message: `Transactions listed from Entity #${query.userEntity}`})
            })
        }
        else {
            const transactions = await Transaction.find(query)
                .populate('from.account')//.populate({ path: 'fromAccount', populate: 'userEntity' })
                .populate('to.account')//.populate({ path: 'toAccount', populate: 'userEntity' })
                //.populate('concept')
            console.log({query, transactions})
            return res.json({transactions, message: 'Transactions listed'})
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
    .then(doc => res.json({message: `Transaction saved #${doc?._id}`}))
    .catch(error => res.status(409).json({ message: error }))
}
export const remove = (req, res) => {
    Transaction.findByIdAndDelete(req.params.id).then((doc) => {
        return res.json({message: `Transaction deleted #${doc?._id}`})
    })
}
