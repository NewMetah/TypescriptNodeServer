import * as Http from 'http'
import { App } from './App'
import { Logger } from './Logger'

const logger = new Logger()

const normalizePort = (val: number|string): number|string|boolean => {
    const p: number = (typeof val === 'string') ? parseInt(val, 10) : val
    if (isNaN(p)) return val
    else if (p >= 0)return p
    return false
}

const port = normalizePort(process.env.PORT || 3000)
const express = new App().getExpress()
express.set('port', port)

const server = Http.createServer(express)
server.listen(port, () => {
    const env = String(process.env.NODE_ENV || 'dev')
    const addr = server.address()
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`
    logger.log(`Listening on port ${bind} in ${env.toUpperCase()} environment`)
})
