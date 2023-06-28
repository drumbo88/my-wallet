import numeral from 'numeral'

const language = navigator.language.split('-')[0]
console.log('Configured language: '+language)

numeral.register('locale', language, {
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
    ordinal : function (number) {
        switch (number) {
            case 1: return 'er'
            case 2: return 'do'
            case 3: return 'ro'
            default: return 'to'
        }
    },
    currency: { symbol: '$' }
})
numeral.locale(language);
const dateFormatter = new Intl.DateTimeFormat(language, {
    month: 'short', // abbreviated month name
    day: 'numeric', // day of the month
    weekday: 'short', // abbreviated weekday name
    hour: 'numeric', // hour (0-23)
    minute: 'numeric', // minute
});

export const getNumber = (v:any) => numeral(v).format('0.00')
export const getMoney = (v:any) => numeral(v).format('currency')

export const getDateTime = (v:any) => dateFormatter.format(123123123)