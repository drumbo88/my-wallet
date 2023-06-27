// Import Models
import { EntityModel } from '../models/Entity'

export const list = async (req, res) => {
    try {
        const message = `Persons`
        console.log(message)
        const people = await EntityModel.getPeople({})
        return res.json({ people, message })
    }
    catch (error: any) {
        console.error(error.stack)
        res.status(409).json({ message: error })
    }
}
// export const create = (req, res) => {
//     const {
//         date, currency, amount,
//         concept, source, destiny,
//         detail
//     } = req.body
//     Person.create({
//         date, currency, amount,
//         concept, source, destiny,
//         detail
//     })
//     .then(doc => res.json({message: `Person saved #${doc._id}`}))
//     .catch(error => res.status(409).json({ message: error }))
// }
// export const read = (req, res) => {
//     Person.findById(req.params.id)
//     .then(doc => res.json({obj: doc}))
//     .catch(error => res.status(409).json({ message: error }))
// }
// export const update = (req, res) => {
//     const {
//         date, currency, amount,
//         concept, source, destiny,
//         detail
//     } = req.body
//     Person.findByIdAndUpdate(req.params.id, {
//         date, currency, amount,
//         concept, source, destiny,
//         detail
//     })
//     .then(doc => res.json({message: `Person saved #${doc?._id}`}))
//     .catch(error => res.status(409).json({ message: error }))
// }
// export const remove = (req, res) => {
//     Person.findByIdAndDelete(req.params.id).then((doc) => {
//         return res.json({message: `Person deleted #${doc?._id}`})
//     })
// }
