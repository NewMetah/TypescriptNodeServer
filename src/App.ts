import * as BodyParser from 'body-parser'
import * as Express from 'express'
import * as Logger from 'morgan'
import * as Compression from 'compression'
import * as Cors from 'cors'
import { IndexRouter } from './routes/IndexRouter'

export class App {
    private express: Express.Application

    constructor() {
        this.express = Express()
        this.middleware()
        this.routes()
    }

    public getExpress(): Express.Application {
        return this.express
    }

    private middleware(): void {
        this.express.use(Logger('dev'))
        this.express.use(BodyParser.json())
        this.express.use(BodyParser.urlencoded({ extended: false}))
        this.express.use(Compression())
        this.express.use(Cors({origin: true}))
    }

    private routes(): void {
        this.express.use('/', new IndexRouter().getRouter())
    }
}
