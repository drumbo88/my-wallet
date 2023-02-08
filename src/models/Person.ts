import { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IEntity } from './Entity';
import { IAccount } from './Account';

enum PersonGenders {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export interface IPersonData {
  firstname: String,
  lastname: String,
  birthdate: Date,
  gender: PersonGenders,
}
export interface IPerson extends IEntity {
  person: IPersonData
}
export const PersonFields = {
  firstname: String,
  lastname: String,
  birthdate: Date,
  gender: { type: String, enum: PersonGenders },
}
export const PersonSchema = new Schema(PersonFields)

export const seeds: IPerson[] = [
    {
      person: {
        firstname: "Darío",
        lastname: "Rumbo",
        birthdate: new Date("1988-06-19"),
        gender: PersonGenders.MALE,
      },
      taxId: "20337466711",
      currency: "ARS",

      user: {
        name: "drumbo88",
        email: "dario.rumbo@gmail.com",
        password: bcrypt.hashSync("12345"),
      },
      accountsOwned: [
        {
          adminEntity: { taxId: "30500003193" }, // findOne
          wallets: [{
            address: "9287394128571952934521",
            alias: "drumbo88bf",
            currency: "ARS",
            detail: "Mi caja de ahorro",
          }]
        },{
          adminEntity: { taxId: "30703088534" }, // findOne
          wallets: [{
            address: "1023948120394812304980",
            alias: "drumbo88mp",
            currency: "ARS",
            detail: "Mi Mercado Pago",
          }]
        },{
          adminEntity: {
            name: 'Binance',
          },
          wallets: [{
            address: "0xA6A4D7B8F180B16C27B017FF93B5AB6264532981",
            alias: "drumbo88bnc",
            currency: "BTC",
            detail: "Mi cuenta Binance",
          }]
        },
      ],
/*      debitCards: [
        {
            number: "4517650650307796",
            expDate: '03/26',
            adminEntity: { taxId: "30500003193" }, // findOne
            currency: "ARS",
            detail: "Mi caja de ahorro BBVA",
        },{
            number: "5537710640956004",
            expDate: '09/27',
            adminEntity: { taxId: "3XXXXXXXX3" }, // findOne
            currency: "ARS",
            detail: "Mi caja de ahorro BNA",
        },
      ],
      prepaidCards: [
        {
          number: "6061268415812862",
          adminEntity: { website: "https://www.argentina.gob.ar/transporte" }, // findOne
          detail: "Mi SUBE",
        },{
          number: "4865680000207907",
          expDate: '10/26',
          adminEntity: { website: 'https://www.bna.com.ar' }, // findOne
          detail: "Mi PreViaje",
        },
      ],
      creditCards: [
        {
          address: "102394812304980",
          adminEntity: { taxId: "30999999993" }, // findOne
          detail: "Mi VisaBBVA",
        },{
          address: "102394812304980",
          adminEntity: { taxId: "30999999993" }, // findOne
          detail: "Mi MCBBVA",
        },{
          address: "102394812304980",
          adminEntity: { taxId: "30999999993" }, // findOne
          detail: "Mi MCCarrefour",
        },
      ],*/
    },
    {
      person: {
        firstname: "Pablo",
        lastname: "Fernández",
        birthdate: new Date("1989-05-19"),
        gender: PersonGenders.MALE,
      },
      //taxId: "20337466729",

      user: {
        name: "pfdez",
      },
    }
];
