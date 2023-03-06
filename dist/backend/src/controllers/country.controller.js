"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.read = exports.create = exports.list = void 0;
// Import Models
const Country_js_1 = require("../models/Country.js");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Country_js_1.Country.find({}).then((countries) => {
        return res.json({ countries, message: 'Countries listed' });
    })
        .catch(error => {
        console.log({ error });
        res.status(409).json({ message: error });
    });
});
exports.list = list;
const create = (req, res) => {
    const { date, country, amount, concept, source, destiny, detail } = req.body;
    Country_js_1.Country.create({
        date, country, amount,
        concept, source, destiny,
        detail
    })
        .then(doc => res.json({ message: `Country saved #${doc._id}` }))
        .catch(error => res.status(409).json({ message: error }));
};
exports.create = create;
const read = (req, res) => {
    Country_js_1.Country.findById(req.params.id)
        .then(doc => res.json({ obj: doc }))
        .catch(error => res.status(409).json({ message: error }));
};
exports.read = read;
const update = (req, res) => {
    const { date, country, amount, concept, source, destiny, detail } = req.body;
    Country_js_1.Country.findByIdAndUpdate(req.params.id, {
        date, country, amount,
        concept, source, destiny,
        detail
    })
        .then(doc => {
        if (doc)
            res.json({ message: `Country saved #${doc._id}` });
    })
        .catch(error => res.status(409).json({ message: error }));
};
exports.update = update;
const remove = (req, res) => {
    Country_js_1.Country.findByIdAndDelete(req.params.id).then(doc => {
        if (doc)
            return res.json({ message: `Country deleted #${doc._id}` });
    });
};
exports.remove = remove;
