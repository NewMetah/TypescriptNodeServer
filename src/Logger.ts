import * as Winston from 'winston'
import * as Path from 'path'
import * as FSE from 'fs-extra'

// Change logDir to change location your log files will be sent
const logDir = Path.join(String(__dirname), '..', 'logs')
FSE.ensureDir(logDir)

const exceptionLog = new (Winston.Logger)({
    exceptionHandlers: [
        new Winston.transports.Console({
            formatter: (e) => {
                // tslint:disable-next-line:no-console
                console.error(e.meta.stack)
                return 'FATAL ERROR'
            },
        }),
        new Winston.transports.File({
            filename: Path.join(logDir, 'exceptions.log'),
            maxsize: 10485760,
        }),
    ],
    exitOnError: false,
})

export class Logger {
    public log(data: any): void {
        const log = new (Winston.Logger)({
            transports: [
                new Winston.transports.Console({
                  json: true,
                }),
            ],
            exitOnError: false,
        })
        log.info(data)
    }

    public logError(data: any): void {
        const log = new (Winston.Logger)({
            transports: [
                new Winston.transports.Console({
                  json: true,
                }),
                new Winston.transports.File({
                    filename: Path.join(logDir, 'error.log'),
                    maxsize: 10485760,
                }),
            ],
            exitOnError: false,
        })
        log.info(data)
    }
}
