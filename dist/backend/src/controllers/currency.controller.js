"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.read = exports.create = exports.list = void 0;
// Import Models
const Currency_js_1 = require("../models/Currency.js");
const list = (req, res) => {
    Currency_js_1.Currency.find({}).then((currencies) => {
        return res.json({ currencies, message: 'Currencies listed' });
    })
        .catch(error => res.status(409).json({ message: error }));
};
exports.list = list;
const create = (req, res) => {
    const { date, currency, amount, concept, source, destiny, detail } = req.body;
    Currency_js_1.Currency.create({
        date, currency, amount,
        concept, source, destiny,
        detail
    })
        .then(doc => res.json({ message: `Currency saved #${doc._id}` }))
        .catch(error => res.status(409).json({ message: error }));
};
exports.create = create;
const read = (req, res) => {
    Currency_js_1.Currency.findById(req.params.id)
        .then(doc => res.json({ obj: doc }))
        .catch(error => res.status(409).json({ message: error }));
};
exports.read = read;
const update = (req, res) => {
    const { date, currency, amount, concept, source, destiny, detail } = req.body;
    Currency_js_1.Currency.findByIdAndUpdate(req.params.id, {
        date, currency, amount,
        concept, source, destiny,
        detail
    })
        .then(doc => {
        if (doc)
            res.json({ message: `Currency saved #${doc._id}` });
    })
        .catch(error => res.status(409).json({ message: error }));
};
exports.update = update;
const remove = (req, res) => {
    Currency_js_1.Currency.findByIdAndDelete(req.params.id).then((doc) => {
        if (doc)
            return res.json({ message: `Currency deleted #${doc._id}` });
    });
};
exports.remove = remove;
