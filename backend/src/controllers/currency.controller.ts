// Import Models
import { CurrencyModel } from '../models/Currency.js'

export const list = (req, res) => {
    CurrencyModel.find({}).then((currencies) => {
        return res.json({currencies, message: 'Currencies listed'})
    })
    .catch(error => res.status(409).json({ message: error }))
}
export const create = (req, res) => {
    const {
        date, currency, amount,
        concept, source, destiny,
        detail
    } = req.body
    CurrencyModel.create({
        date, currency, amount,
        concept, source, destiny,
        detail
    })
    .then(doc => res.json({message: `Currency saved #${doc._id}`}))
    .catch(error => res.status(409).json({ message: error }))
}
export const read = (req, res) => {
    CurrencyModel.findById(req.params.id)
    .then(doc => res.json({obj: doc}))
    .catch(error => res.status(409).json({ message: error }))
}
export const update = (req, res) => {
    const {
        date, currency, amount,
        concept, source, destiny,
        detail
    } = req.body
    CurrencyModel.findByIdAndUpdate(req.params.id, {
        date, currency, amount,
        concept, source, destiny,
        detail
    })
    .then(doc => {
        if (doc)
            res.json({message: `Currency saved #${doc._id}`})
    })
    .catch(error => res.status(409).json({ message: error }))
}
export const remove = (req, res) => {
    CurrencyModel.findByIdAndDelete(req.params.id).then((doc) => {
        if  (doc)
            return res.json({message: `Currency deleted #${doc._id}`})
    })
}
