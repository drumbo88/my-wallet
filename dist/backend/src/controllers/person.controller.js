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
exports.list = void 0;
// Import Models
const Entity_1 = require("../models/Entity");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = `Persons`;
        console.log(message);
        const people = yield Entity_1.Entity.getPeople({});
        return res.json({ people, message });
    }
    catch (error) {
        console.error(error.stack);
        res.status(409).json({ message: error });
    }
});
exports.list = list;
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
