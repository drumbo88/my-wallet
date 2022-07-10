// Import Models
const Income = require('../models/income')

exports.incomeList = (req, res) => {
    return res.json({message: 'IncomeList'})
}
exports.incomeAdd = (req, res) => {
    const { symbol, name, value, api } = req.body
    new Income()
    return res.json({message: 'IncomeList'})
}
exports.incomeView = (req, res) => {
    return res.json({message: 'IncomeList'})
}
exports.incomeModify = (req, res) => {
    return res.json({message: 'IncomeList'})
}
exports.incomeDelete = (req, res) => {
    return res.json({message: 'IncomeList'})
}
