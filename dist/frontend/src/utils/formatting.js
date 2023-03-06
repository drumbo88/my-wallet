"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateTime = exports.getMoney = exports.getNumber = void 0;
const numeral_1 = __importDefault(require("numeral"));
const language = navigator.language.split('-')[0];
console.log('Configured language: ' + language);
numeral_1.default.register('locale', language, {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        switch (number) {
            case 1: return 'er';
            case 2: return 'do';
            case 3: return 'ro';
            default: return 'to';
        }
    },
    currency: { symbol: '$' }
});
numeral_1.default.locale(language);
const dateFormatter = new Intl.DateTimeFormat(language, {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric', // minute
});
const getNumber = (v) => (0, numeral_1.default)(v).format('0.00');
exports.getNumber = getNumber;
const getMoney = (v) => (0, numeral_1.default)(v).format('currency');
exports.getMoney = getMoney;
const getDateTime = (v) => dateFormatter.format(new Date(v));
exports.getDateTime = getDateTime;
