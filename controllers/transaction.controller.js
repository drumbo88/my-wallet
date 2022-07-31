// Import Models
const Transaction = require('../models/transaction')

exports.list = (req, res) => {
    Transaction.find({}).then((transactions) => {
        return res.json({transactions, message: 'Transactions listed'})
    })
}
exports.create = (req, res) => {
    Transaction.create({
        date, currency, amount,
        concept, source, destiny, 
        detail
    } = req.body)
    .then(doc => res.json({message: `Transaction saved #${doc._id}`}))
    .catch(error => res.status(409).json({ message: error }))
}
exports.read = (req, res) => {
    Transaction.findById(req.params.id)
    .then(doc => res.json({obj: doc}))
    .catch(error => res.status(409).json({ message: error }))
}
exports.update = (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, {
        date, currency, amount,
        concept, source, destiny, 
        detail
    } = req.body)
    .then(doc => res.json({message: `Transaction saved #${doc._id}`}))
    .catch(error => res.status(409).json({ message: error }))
}
exports.delete = (req, res) => {
    Transaction.findByIdAndDelete(req.params.id).then((doc) => {
        return res.json({message: `Transaction deleted #${doc._id}`})
    })
}
