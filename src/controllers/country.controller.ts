// Import Models
import { model as Country } from '../models/country.js'

export const list = (req, res) => {
    Country.find({}).then((countries) => {
        return res.json({countries, message: 'Countries listed'})
    })
    .catch(error => res.status(409).json({ message: error }))
}
export const create = (req, res) => {
    const {
        date, country, amount,
        concept, source, destiny,
        detail
    } = req.body
    Country.create({
        date, country, amount,
        concept, source, destiny,
        detail
    })
    .then(doc => res.json({message: `Country saved #${doc._id}`}))
    .catch(error => res.status(409).json({ message: error }))
}
export const read = (req, res) => {
    Country.findById(req.params.id)
    .then(doc => res.json({obj: doc}))
    .catch(error => res.status(409).json({ message: error }))
}
export const update = (req, res) => {
    const {
        date, country, amount,
        concept, source, destiny,
        detail
    } = req.body
    Country.findByIdAndUpdate(req.params.id, {
        date, country, amount,
        concept, source, destiny,
        detail
    })
    .then(doc => res.json({message: `Country saved #${doc._id}`}))
    .catch(error => res.status(409).json({ message: error }))
}
export const remove = (req, res) => {
    Country.findByIdAndDelete(req.params.id).then((doc) => {
        return res.json({message: `Country deleted #${doc._id}`})
    })
}
