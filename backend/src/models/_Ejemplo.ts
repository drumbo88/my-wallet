import { getModelForClass, prop, mongoose, modelOptions, DocumentType, getName } from '@typegoose/typegoose';
import { DB_CONNECTION_STRING, myModelOptions } from '../config';

import { Ref } from "@typegoose/typegoose";

// Tu clase Currency (supongamos que se ve así)
@modelOptions(myModelOptions)
class Currency {
  @prop({ type: String, unique: true, required: true })
  code!: string;
}
const CurrencyModel = getModelForClass(Currency);

// Tu clase Transaction
@modelOptions(myModelOptions)
class Transaction {
    @prop({
        ref: () => getName(Currency),
        required: true,
        localField: 'currency',
        foreignField: 'code',
        justOne: true
    })
    currency: Ref<Currency, string>;
}
// class Transaction {
//   @prop({
//     ref: () => Currency,
//     required: true,
//     localField: 'currencyCode',
//     foreignField: 'code',
//     justOne: true
//   })
//   currency: Ref<Currency, string>;
//   @prop({ type: String, required: true })
//   currencyCode: string;
// }

const TransactionModel = getModelForClass(Transaction);


(async () => {
    // Conexión a la BD
    await mongoose.connect(DB_CONNECTION_STRING)
    if (!mongoose.connection.db) {
        console.log(`No se pudo conectar con la base de datos '${DB_CONNECTION_STRING}'.`)
        return
    }
    console.log(`✅ Conectado a la base de datos '${DB_CONNECTION_STRING}'.`)

    // Primero, crea una instancia de Currency con code = 'ARS'
    const currencyARS = await CurrencyModel.findOne({ code: 'ARS' });

    // Guarda la instancia de Currency en la base de datos
    // await currencyARS.save();

    // Crea la transacción utilizando la referencia al objeto Currency
    console.log({currencyARS})
    const transaction = await TransactionModel.create({ currencyCode: currencyARS?.code });
    console.log({transaction})

    const x = await TransactionModel.findById(transaction._id)
    console.log({x,t:transaction, xPop:await x?.populate('currency')}); // Debería mostrar 'ARS' (o el código correspondiente a la moneda).
})();


/**
    OperationItem {
        currency: Ref<Currency, string>
        quantity: number
        amount: number
        total: number
        detail: string
        status: OperationItemStatus
        type: OperationItemTypes (
            ASSET = 'Asset'
            CONCEPT = 'CountableConcept',
            OPERATION = 'CountableOperation',
        )
        item: Ref<OperationItemType>
    }

    Asset {
        name, code, countable
    }
    CountableConcept {
        name, code
    }
    CountableOperation {
        name, code
    }



 */