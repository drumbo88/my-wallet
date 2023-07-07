import { PersonGenders } from 'common/types/person';
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { BaseModel } from './BaseModel';
import { myModelOptions, myModelOptionsNoId } from '../config';
import bcrypt from 'bcryptjs'

export type DocPerson = DocumentType<Person>;

/*************************************************************************************
 * Clase "Person"
 */
@modelOptions(myModelOptionsNoId)
export class Person extends BaseModel
{
    @prop({ type: String, required: true })
    firstnames: string

    @prop({ type: String, required: true })
    lastnames: string

    @prop({ type: Date })
    birthdate: Date

    @prop({ type: String, enum: PersonGenders })
    gender: string
}

export interface IPersonSeed {
}

export const seeds: IPersonSeed[] = [
    {
        person: {
            firstnames: "Darío",
            lastnames: "Rumbo",
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
            }, {
                adminEntity: { taxId: "30703088534" }, // findOne
                wallets: [{
                    address: "1023948120394812304980",
                    alias: "drumbo88mp",
                    currency: "ARS",
                    detail: "Mi Mercado Pago",
                }]
            }, {
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
            firstnames: "Rocío",
            lastnames: "Fariña",
            birthdate: new Date("1993-03-26"),
            gender: PersonGenders.FEMALE,
        },
        taxId: "27373543212",
        currency: 'USD',
        user: {
            name: "f.rocio",
        },
    },
    {
        person: {
            firstnames: "José",
            lastnames: "Dorce",
            birthdate: new Date("1987-03-15"),
            gender: PersonGenders.MALE,
        },
        taxId: "27326775652",
        currency: 'ARS',
        user: {
            email: "dorcejose@yahoo.com.ar",
            name: "jdorce",
        },
    },
    {
        person: {
            firstnames: "Pablo",
            lastnames: "Fernández",
            birthdate: new Date("1989-05-19"),
            gender: PersonGenders.MALE,
        },
        //taxId: "20337466729",

        user: {
            name: "pfdez",
        },
    }
];
