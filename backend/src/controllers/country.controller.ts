// Import Models
import { CountryModel } from '../models/Country.js'

export const list = async (req, res) => {
    CountryModel.find({}).then((countries) => {
        return res.json({countries, message: 'Countries listed'})
    })
    .catch(error => {
        console.log({error})
        res.status(409).json({ message: error })
    })
}
export const create = (req, res) => {
    const {
        date, country, amount,
        concept, source, destiny,
        detail
    } = req.body
    CountryModel.create({
        date, country, amount,
        concept, source, destiny,
        detail
    })
    .then(doc => res.json({message: `Country saved #${doc._id}`}))
    .catch(error => res.status(409).json({ message: error }))
}
export const read = (req, res) => {
    CountryModel.findById(req.params.id)
    .then(doc => res.json({obj: doc}))
    .catch(error => res.status(409).json({ message: error }))
}
export const update = (req, res) => {
    const {
        date, country, amount,
        concept, source, destiny,
        detail
    } = req.body
    CountryModel.findByIdAndUpdate(req.params.id, {
        date, country, amount,
        concept, source, destiny,
        detail
    })
    .then(doc => {
        if (doc)
            res.json({message: `Country saved #${doc._id}`})
    })
    .catch(error => res.status(409).json({ message: error }))
}
export const remove = (req, res) => {
    CountryModel.findByIdAndDelete(req.params.id).then(doc => {
        if (doc)
            return res.json({message: `Country deleted #${doc._id}`})
    })
}
