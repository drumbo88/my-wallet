import { model, Model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IPersonEntity, PersonEntitySchema } from './PersonEntity';
import { IAccount } from './Account';

enum PersonGenders {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export interface IPerson extends IPersonEntity {
  firstname: String,
  lastname: String,
  birthdate: Date,
  gender: PersonGenders,
}
export interface IPersonModel extends Model<IPerson> {}
export interface IPersonDocument extends Document<IPersonModel> {
  addAccount(accountData: IAccount): IPersonDocument,
}

export const seeds: IPerson[] = [
    {
      firstname: "Darío",
      lastname: "Rumbo",
      birthdate: new Date("1988-06-19"),
      taxId: "20337466711",
      gender: PersonGenders.MALE,

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
          adminEntity: { taxId: "30999999993" }, // findOne
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
      firstname: "Pablo",
      lastname: "Fernández",
      birthdate: new Date("1989-05-19"),
      //taxId: "20337466729",
      gender: PersonGenders.MALE,

      user: {
        name: "pfdez",
      },
    }
];

const PersonSchema = PersonEntitySchema.add({
  firstname: String,
  lastname: String,
  birthdate: Date,
  gender: { type: String, enum: PersonGenders },
})
// const PersonSchema = new Schema<IPerson>({
//   firstname: String,
//   lastname: String,
//   birthdate: Date,
//   gender: { type: String, enum: PersonGenders },
//   ...PersonEntityFields
// })

PersonSchema.methods.addAccount = async function (accountData: IAccount) {
  //accountData.adminEntity = //PersonEntity.find(accountData)
    //(await Company.find(accountData.adminEntity) || await Person.find(accountData.adminEntity))
}
PersonSchema.statics.seed = async function (seeds: IPerson[]) {
  const people: IPersonDocument[] = await this.insertMany(seeds)
  for (const i in seeds) {
    const seed = seeds[i]
    const person = people[i]
    if (seed.accountsOwned?.length) {
      seed.accountsOwned.forEach(accData => person.addAccount(accData))
      await person.save()
    }
  }
}

export const Person = model<IPerson, IPersonModel>('Person', PersonSchema)
