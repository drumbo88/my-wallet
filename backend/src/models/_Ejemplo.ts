import { getModelForClass, prop, mongoose } from '@typegoose/typegoose';
import { DB_CONNECTION_STRING } from '../config';

// Define el modelo de Wallet
class Wallet {
  @prop({ type: String, required: true })
  name: string;
}

// Define el modelo de Account
class Account {
  @prop({ type: mongoose.Schema.Types.Mixed })
  wallets: Wallet[];
}

const AccountModel = getModelForClass(Account);
const WalletModel = getModelForClass(Wallet);

// Ejemplo de datos
const accountData = {
  wallets: [
    {
      name: 'Wallet 1',
    },
    {
      name: 'Wallet 2',
    },
  ],
};

(async () => {
 // Conexión a la BD
 await mongoose.connect(DB_CONNECTION_STRING)
 if (!mongoose.connection.db) {
     console.log(`No se pudo conectar con la base de datos '${DB_CONNECTION_STRING}'.`)
     return
 }
 console.log(`✅ Conectado a la base de datos '${DB_CONNECTION_STRING}'.`)
 const account = new AccountModel(accountData);
 account.markModified('wallets'); // Marcar el campo 'wallets' como modificado
 await account.save();
  console.log({ w:account.wallets });
})();