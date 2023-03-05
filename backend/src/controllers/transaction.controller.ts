// Import Models
import { Transaction } from '../models/Transaction'
import { Account } from '../models/Account'
import { Entity } from '../models/Entity'

export const list = async (req, res) => {
    const query: any = req.params.from ? { from: { account: req.params.from } } : {}
    req.body.idEntity = req.params.id
    try {
        let txQuery, message
        if (req.body.idEntity) {
            message = `Transactions of Entity #${req.body.idEntity}`
            console.log(message)
            query.ownerEntityId = req.body.idEntity
            const accounts = await Account.find(query, '_id')
            const accountIds = accounts.map((account:any) => account._id)
            txQuery = { $or: [
                { 'from.accountId': { $in: accountIds } },
                { 'to.accountId': { $in: accountIds } }
            ]}
        }
        else {
            message = 'Transactions of everyone'
            console.log(message)
            txQuery = query
        }
        const transactions = await Transaction.find(txQuery)
        .populate('from.account')
        .populate('to.account')
        .populate('allocations.operation')
        .populate('currency')
        const transaction = transactions?.[0]
        for (const transaction of transactions) {
            let account: any = transaction.from?.account
            if (account) {
                await account.populate('ownerEntity')
                await account.populate('adminEntity')
                if (transaction.from)
                    transaction.from.account = account
            }
            account = transaction.to?.account
            if (account) {
                await account.populate('ownerEntity')
                await account.populate('adminEntity')
                if (transaction.to)
                    transaction.to.account = account
            }
        }
        const from = transaction?.from
        const fromAccount = from?.account
        const fromAccountOwner = fromAccount?.ownerEntity || from?.accountOwner
        const allocation = transaction?.allocations?.[0]
        const operation = allocation?.operation
        //console.log({transaction, from, fromAccount, fromAccountOwner})
        return res.json({ transactions, message })
    }
    catch (error: any) {
        console.error(error.stack)
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
