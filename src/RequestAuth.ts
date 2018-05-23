import { Request } from 'express'
import { Formatter } from './Formatter'

const formatter = new Formatter()

export class RequestAuth {
    private username: string
    private password: string
    private token: string

    constructor(req: Request) {
        if (req) {
            const self = this
            try {
                // add methods of authorization here. basic and bearer are already included.
                const regBasic = /^basic/i
                const regBearer = /^bearer/i
                const auth = req.get('authorization')
                if (auth) {
                    const cred = new Buffer(auth, 'base64').toString('ascii')
                    if (regBasic.test(cred)) {
                        const basic = cred.split(' ').pop().split(':')
                        this.username = formatter.getString(basic[0])
                        this.password = formatter.getString(basic[1])
                    } else if (regBearer.test(cred)) {
                        const bearer = cred.split(' ').pop()
                        this.token = formatter.getString(bearer)
                    }
                }
            } catch (error) {
                // no authorization
            }
        }
    }

    public getUsername(): string {
        return this.username
    }

    public getPassword(): string {
        return this.password
    }

    public getToken(): string {
        return this.token
    }
}
