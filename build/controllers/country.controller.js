"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.read = exports.create = exports.list = void 0;
const list = (req, res) => {
    // Country.find({}).then((countries) => {
    //     return res.json({countries, message: 'Countries listed'})
    // })
    // .catch(error => res.status(409).json({ message: error }))
};
exports.list = list;
const create = (req, res) => {
    // const {
    //     date, country, amount,
    //     concept, source, destiny,
    //     detail
    // } = req.body
    // Country.create({
    //     date, country, amount,
    //     concept, source, destiny,
    //     detail
    // })
    // .then(doc => res.json({message: `Country saved #${doc._id}`}))
    // .catch(error => res.status(409).json({ message: error }))
};
exports.create = create;
const read = (req, res) => {
    // Country.findById(req.params.id)
    // .then(doc => res.json({obj: doc}))
    // .catch(error => res.status(409).json({ message: error }))
};
exports.read = read;
const update = (req, res) => {
    // const {
    //     date, country, amount,
    //     concept, source, destiny,
    //     detail
    // } = req.body
    // Country.findByIdAndUpdate(req.params.id, {
    //     date, country, amount,
    //     concept, source, destiny,
    //     detail
    // })
    // .then(doc => res.json({message: `Country saved #${doc._id}`}))
    // .catch(error => res.status(409).json({ message: error }))
};
exports.update = update;
const remove = (req, res) => {
    // Country.findByIdAndDelete(req.params.id).then((doc) => {
    //     return res.json({message: `Country deleted #${doc._id}`})
    // })
};
exports.remove = remove;
