import 'reflect-metadata'
import { DataSource } from 'typeorm'
import config from './config'

export const AppDataSource: DataSource = new DataSource({
    type: config.DB_TYPE,
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    entities: ["./entity/**/*.ts"],
    synchronize: true,
    logging: false,
})

export function connectDataBase() {
    AppDataSource.initialize()
        .then(() => {
            console.log('db connected')
        })
        .catch((error: any) => {
            console.log(`DataBase error:, ${error}`)
        })
}