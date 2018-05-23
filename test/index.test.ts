import * as chai from 'chai'
import chaiHttp = require('chai-http')
import * as mocha from 'mocha'

import { App } from '../src/App'
const app = new App().getExpress()

chai.use(chaiHttp)
const expect = chai.expect

describe('GET /', () => {
    it('get welcome message', () => {
        return chai.request(app).get('/')
            .then((res) => {
                expect(res.status).to.equal(200)
                expect(res.body).to.be.an('object')
                expect(res.body.message).to.equal('Hello World.')
            })
    })
})

describe('GET /v1/token', () => {
    it('get account session token', () => {
        return chai.request(app).get('/v1/token')
            .set('Authorization', new Buffer('Basic username:password').toString('base64'))
            .then((res) => {
                expect(res.status).to.equal(200)
                expect(res.body).to.be.an('object')
                expect(res.body.ack).to.equal(true)
                expect(res.body.token).to.be.an('string')
            })
    })
})

describe('DELETE /v1/token', () => {
    it('expire account session token', () => {
        return chai.request(app).del('/v1/token')
            .set('Authorization', new Buffer('Bearer 5a8ce83cd2cfd0-1763-11e8-9605-75399076fcf1').toString('base64'))
            .then((res) => {
                expect(res.status).to.equal(200)
                expect(res.body).to.be.an('object')
                expect(res.body.ack).to.equal(true)
            })
    })
})
