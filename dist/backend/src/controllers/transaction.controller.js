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
const Transaction_1 = require("../models/Transaction");
const Account_1 = require("../models/Account");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const query = req.params.from ? { from: { account: req.params.from } } : {};
    req.body.idEntity = req.params.id;
    try {
        let txQuery, message;
        if (req.body.idEntity) {
            message = `Transactions of Entity #${req.body.idEntity}`;
            console.log(message);
            query.ownerEntityId = req.body.idEntity;
            const accounts = yield Account_1.Account.find(query, '_id');
            const accountIds = accounts.map((account) => account._id);
            txQuery = { $or: [
                    { 'from.accountId': { $in: accountIds } },
                    { 'to.accountId': { $in: accountIds } }
                ] };
        }
        else {
            message = 'Transactions of everyone';
            console.log(message);
            txQuery = query;
        }
        const transactions = yield Transaction_1.Transaction.find(txQuery)
            .populate('from.account')
            .populate('to.account')
            .populate('allocations.operation')
            .populate('currency');
        const transaction = transactions === null || transactions === void 0 ? void 0 : transactions[0];
        for (const transaction of transactions) {
            let account = (_a = transaction.from) === null || _a === void 0 ? void 0 : _a.account;
            if (account) {
                yield account.populate('ownerEntity');
                yield account.populate('adminEntity');
                if (transaction.from)
                    transaction.from.account = account;
            }
            account = (_b = transaction.to) === null || _b === void 0 ? void 0 : _b.account;
            if (account) {
                yield account.populate('ownerEntity');
                yield account.populate('adminEntity');
                if (transaction.to)
                    transaction.to.account = account;
            }
        }
        const from = transaction === null || transaction === void 0 ? void 0 : transaction.from;
        const fromAccount = from === null || from === void 0 ? void 0 : from.account;
        const fromAccountOwner = (fromAccount === null || fromAccount === void 0 ? void 0 : fromAccount.ownerEntity) || (from === null || from === void 0 ? void 0 : from.accountOwner);
        const allocation = (_c = transaction === null || transaction === void 0 ? void 0 : transaction.allocations) === null || _c === void 0 ? void 0 : _c[0];
        const operation = allocation === null || allocation === void 0 ? void 0 : allocation.operation;
        //console.log({transaction, from, fromAccount, fromAccountOwner})
        return res.json({ transactions, message });
    }
    catch (error) {
        console.error(error.stack);
        res.status(409).json({ message: error });
    }
});
exports.list = list;
const create = (req, res) => {
    const { date, currency, amount, concept, source, destiny, detail } = req.body;
    Transaction_1.Transaction.create({
        date, currency, amount,
        concept, source, destiny,
        detail
    })
        .then(doc => res.json({ message: `Transaction saved #${doc._id}` }))
        .catch(error => res.status(409).json({ message: error }));
};
exports.create = create;
const read = (req, res) => {
    Transaction_1.Transaction.findById(req.params.id)
        .then(doc => res.json({ obj: doc }))
        .catch(error => res.status(409).json({ message: error }));
};
exports.read = read;
const update = (req, res) => {
    const { date, currency, amount, concept, source, destiny, detail } = req.body;
    Transaction_1.Transaction.findByIdAndUpdate(req.params.id, {
        date, currency, amount,
        concept, source, destiny,
        detail
    })
        .then(doc => res.json({ message: `Transaction saved #${doc === null || doc === void 0 ? void 0 : doc._id}` }))
        .catch(error => res.status(409).json({ message: error }));
};
exports.update = update;
const remove = (req, res) => {
    Transaction_1.Transaction.findByIdAndDelete(req.params.id).then((doc) => {
        return res.json({ message: `Transaction deleted #${doc === null || doc === void 0 ? void 0 : doc._id}` });
    });
};
exports.remove = remove;
