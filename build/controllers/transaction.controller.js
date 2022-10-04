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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.read = exports.create = exports.list = void 0;
// Import Models
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_js_1 = require("../models/transaction.js");
const account_js_1 = require("../models/account.js");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.params.from ? { fromAccount: req.params.from } : {};
    req.body.idEntity = req.params.id;
    try {
        if (req.body.idEntity) {
            query.userEntity = mongoose_1.default.Types.ObjectId(req.body.idEntity);
            const accounts = yield account_js_1.model.find(query, '_id');
            const txQuery = { $or: [
                    { fromAccount: { $in: accounts } },
                    { toAccount: { $in: accounts } }
                ] };
            yield transaction_js_1.model.find(txQuery)
                .populate('fromAccount').populate({ path: 'fromAccount', populate: 'userEntity' })
                .populate('toAccount').populate({ path: 'toAccount', populate: 'userEntity' })
                .populate('concept')
                .then((transactions) => {
                return res.json({ transactions, message: `Transactions listed from Entity #${query.userEntity}` });
            });
        }
        else {
            yield transaction_js_1.model.find(query)
                .populate('fromAccount').populate({ path: 'fromAccount', populate: 'userEntity' })
                .populate('toAccount').populate({ path: 'toAccount', populate: 'userEntity' })
                .populate('concept').then((transactions) => {
                return res.json({ transactions, message: 'Transactions listed' });
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(409).json({ message: error });
    }
});
exports.list = list;
const create = (req, res) => {
    const { date, currency, amount, concept, source, destiny, detail } = req.body;
    transaction_js_1.model.create({
        date, currency, amount,
        concept, source, destiny,
        detail
    })
        .then(doc => res.json({ message: `Transaction saved #${doc._id}` }))
        .catch(error => res.status(409).json({ message: error }));
};
exports.create = create;
const read = (req, res) => {
    transaction_js_1.model.findById(req.params.id)
        .then(doc => res.json({ obj: doc }))
        .catch(error => res.status(409).json({ message: error }));
};
exports.read = read;
const update = (req, res) => {
    const { date, currency, amount, concept, source, destiny, detail } = req.body;
    transaction_js_1.model.findByIdAndUpdate(req.params.id, {
        date, currency, amount,
        concept, source, destiny,
        detail
    })
        .then(doc => res.json({ message: `Transaction saved #${doc._id}` }))
        .catch(error => res.status(409).json({ message: error }));
};
exports.update = update;
const remove = (req, res) => {
    transaction_js_1.model.findByIdAndDelete(req.params.id).then((doc) => {
        return res.json({ message: `Transaction deleted #${doc._id}` });
    });
};
exports.remove = remove;
