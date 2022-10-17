"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { Schema } = mongoose_1.default;
const schema = new Schema({
    status: { type: String, enum: ['ACTIVE', 'INCATIVE'], default: 'ACTIVE' },
    entity: { type: Schema.Types.ObjectId, ref: 'Entity' },
    // types ['Person', 'Company']
    person: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthdate: { type: Date },
        taxId: { type: String },
        gender: { type: String, enum: ["male", "female", "other"], required: true },
        entity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
    },
    company: {
        name: { type: String, required: true },
        alias: { type: String },
        taxId: { type: String, unique: true },
        entity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
        type: { type: String, enum: ['Company', 'Wallet', 'Bank', 'CryptoExchange', 'CryptoWallet', 'DigitalWallet'], default: 'Company' },
    },
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        status: { type: String, enum: ['ACTIVE', 'INCATIVE'], default: 'ACTIVE' },
    },
    currency: { type: String },
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
});
exports.schema = schema;
const companies = [
    {
        company: {
            name: 'BBVA Francés',
            taxId: '30500003193',
            type: 'Bank',
        }
    }, {
        company: {
            name: 'Foncap SA',
            taxId: '30692317714',
            accounts: [{
                    adminEntity: { taxId: '30500003193' },
                }]
        }
    }, {
        company: {
            name: 'Binance',
            companyType: 'CryptoExchange',
        }
    },
];
const people = [
    {
        person: {
            firstName: "Darío",
            lastName: "Rumbo",
            birthdate: "1988-06-19",
            taxId: "20337466711",
            gender: "male",
        },
        user: {
            name: "drumbo88",
            email: "dario.rumbo@gmail.com",
            password: bcryptjs_1.default.hashSync("12345"),
        },
        accounts: [
            {
                address: "9287394128571952934521",
                alias: "drumbo88bf",
                adminEntity: { taxId: "30500003193" },
                currency: "ARS",
                detail: "Mi caja de ahorro",
            },
            {
                address: "1023948120394812304980",
                alias: "drumbo88mp",
                adminEntity: { taxId: "30999999993" },
                currency: "ARS",
                detail: "Mi Mercado Pago",
            },
            {
                address: "0xA6A4D7B8F180B16C27B017FF93B5AB6264532981",
                alias: "drumbo88bnc",
                adminEntity: {
                    name: 'Binance',
                    type: 'CryptoExchange',
                },
                currency: "BTC",
                detail: "Mi cuenta Binance",
            },
        ],
        debitCards: [
            {
                number: "4517650650307796",
                expDate: '03/26',
                adminEntity: { taxId: "30500003193" },
                currency: "ARS",
                detail: "Mi caja de ahorro BBVA",
            }, {
                number: "5537710640956004",
                expDate: '09/27',
                adminEntity: { taxId: "3XXXXXXXX3" },
                currency: "ARS",
                detail: "Mi caja de ahorro BNA",
            },
        ],
        prepaidCards: [
            {
                number: "6061268415812862",
                adminEntity: { website: "https://www.argentina.gob.ar/transporte" },
                detail: "Mi SUBE",
            }, {
                number: "4865680000207907",
                expDate: '10/26',
                adminEntity: { website: 'https://www.bna.com.ar' },
                detail: "Mi PreViaje",
            },
        ],
        creditCards: [
            {
                address: "102394812304980",
                adminEntity: { taxId: "30999999993" },
                detail: "Mi VisaBBVA",
            }, {
                address: "102394812304980",
                adminEntity: { taxId: "30999999993" },
                detail: "Mi MCBBVA",
            }, {
                address: "102394812304980",
                adminEntity: { taxId: "30999999993" },
                detail: "Mi MCCarrefour",
            },
        ],
    }
];
//export const seeds = [].concat(companies, people)
/*{ type: 'Person', status: 'ACTIVE', child: {
  firstName: 'Darío',
  lastName: 'Rumbo',
  birthdate: '1988-06-19',
  taxId: '20337466711',
  gender: 'male',
}, accounts: [{
  address: '9287394128571952934521',
  alias: 'drumbo88bf',
  status: 'ACTIVE',
  adminEntity: companyModel.getByTaxId('30-50000319-3').getEntity(),
  // userEntity: thisPersonObjId,
  currency: 'ARS',
  detail: 'Mi caja de ahorro',
}]},*/
/*userSchema.statics.seeds = () => [
  {
    name: 'admin',
    email: 'admin@test.com',
    password: bycript('admin'),
    entity: Schema.Types.ObjectId,
    transactionConcepts: [
      {
        Entity: Schema.Types.ObjectId,
        concept: { type: String, unique: true },
      },
    ],
  },
];*/
/*schema.statics.create = async (data) => {
    try {
        return await this.create(data)
    }
    catch (error) {
        throw new Error(error)
    }
}*/
//schema.statics.seed = mongoose.seed
/*
schema.statics.seeder = async (data) => {
    const { company, person, ...entity } = data;

    if (company) {
        CompanyModel.seeder(company)
    }
    else if (person) {
        CompanyModel.seeder(person)
    }

    const { firstName, lastName, birthdate, taxId, gender } = data;
    const obj = new model({
      firstName,
      lastName,
      birthdate,
      taxId,
      gender,
    });

    const entity = new EntityModel({ type: "Person", child: obj });

    if (typeof data.accounts == "undefined") {
      data.accounts = [];
    }
    for (const dataAccount of data.accounts) {
      const adminEntity = await CompanyModel.findOne(dataAccount.adminEntity);

      const account = await AccountModel.create({
        ...dataAccount,
        adminEntity: adminEntity.entity._id,
        userEntity: entity._id,
      });

      entity.accounts.push(account);
    }

    await entity.save();
    if (typeof data.user != "undefined") {
      const user = await UserModel.create({
        ...data.user,
        entity: entity._id,
      })
      entity.user = user._id
    }
    await entity.save();
    obj.entity = entity;
    await obj.save();
    console.log(`${obj.firstName} ${obj.lastName} entity ID: ${entity._id}`)
};
*/
const model = mongoose_1.default.model('Entity', schema);
exports.model = model;
