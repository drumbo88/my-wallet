import app from '../app';
import { AppDataSource, connect } from '../database';
import { Currency } from '../entity/Currency'
import server from '../server';
import * as config from '../config';

describe('DB test using TypeORM', () => {

    beforeAll(async () => {
        //await server.init(app, config)
        await connect()
        /*connection = new DataSource({
            type: "mongodb",
            host: DB_DNS,
            port: DB_PORT,
            //username: DB_USER,
            //password: DB_PASSWORD,
            database: DB_NAME,
            entities: [join(__dirname , "..", "entity", "**", "*.ts")],
            useUnifiedTopology: true,
        })
        try {
            console.log(join(__dirname , "..", "entity", "**", "*.{ts,js}"))
            await connection.initialize()
        }
        catch (err) {
            console.error("Error during Data Source initialization", err)
        }*/
    });
    test('Currency.getOne(): Should get correct Currency', async () => {
        console.log({init:AppDataSource.isInitialized, entityMetadatas:AppDataSource.entityMetadatas})
        const currency = await Currency.getOne("ARS")
        //const currency = await connection.manager.findOneOrFail(Currency, { where: { code: 'ARS' } })
        expect(currency.name).toBe('Peso Argentino')
    })

})
