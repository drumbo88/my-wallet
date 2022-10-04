import numeral from 'numeral'

numeral.register('locale', 'ar', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
})
numeral.locale('ar');

export const getNumber = v => numeral(v).format('0.00')

export const getDateTime = v => new Date(v).toLocaleString()