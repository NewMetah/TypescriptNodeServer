import { Router, Request, Response, NextFunction } from 'express'
import * as Async from 'async'
import { RequestAuth } from '../RequestAuth'

export class IndexRouter {
    private router: Router

    constructor() {
        this.router = Router()
        this.router.get('/', this.home)
        this.router.get('/v1/token', this.login)
        this.router.delete('/v1/token', this.logout)
    }

    public getRouter(): Router {
        return this.router
    }

    /**
     * @api {get} / Home
     * @apiVersion 1.0.0
     * @apiName IndexHome
     * @apiGroup Index
     * @apiDescription Index home request.
     *
     * @apiSuccess {String} message Welcome message.
     *
     * @apiSuccessExample {json} Success-Response:
     *     {
     *          message: 'Hello World.'
     *     }
     */
    private home(req: Request, res: Response, next: NextFunction): void {
        res.status(200)
        .send({
            message: 'Hello World.',
        })
    }

    /**
     * @api {get} /v1/login Login
     * @apiVersion 1.0.0
     * @apiName IndexLogin
     * @apiGroup Index
     * @apiDescription Begin users session.
     *
     * @apiHeader Authorization Basic `username`:`password`
     * @apiHeader Content-Type application/json
     *
     * @apiSuccess {Boolean} ack Will be true on success and false on failure.
     * @apiSuccess {String} token Token user can use for other api calls.
     *
     * @apiSuccessExample {json} Success-Response:
     *     {
     *          ack: true,
     *          token: '5a8ce83cd2cfd0-1763-11e8-9605-75399076fcf1'
     *     }
     *
     * @apiError {String} errorMessage Message of why api call failed.
     *
     * @apiErrorExample {json} Error-Response:
     *     {
     *          ack: false,
     *          errorMessage: 'Username and password do not match.'
     *     }
     */
    private login(req: Request, res: Response, next: NextFunction): void {
        Async.waterfall([
            (step: (err: string, username: string, password: string) => void) => {
                const auth: RequestAuth = new RequestAuth(req)
                if (!auth.getUsername()) step('Username required.', null, null)
                else if (!auth.getPassword()) step('Username required.', null, null)
                else step(null, auth.getUsername(), auth.getPassword())
            },
            (username: string, password: string, step: (err: string, token: string) => void) => {
                // check account info with database and generate token
                const token = '5a8ce83cd2cfd0-1763-11e8-9605-75399076fcf1'
                step(null, token)
            },
        ], (err: string, tokenValue: string) => {
            if (err)
                res.status(200)
                .send({
                    ack: false,
                    errorMessage: err,
                })
            else
                res.status(200)
                .send({
                    ack: true,
                    token: tokenValue,
                })
        })
    }

    /**
     * @api {delete} /v1/token Logout
     * @apiVersion 1.0.0
     * @apiName IndexLogout
     * @apiGroup Index
     * @apiDescription End users auth session.
     *
     * @apiHeader Authorization Bearer `access token`
     * @apiHeader Content-Type application/json
     *
     * @apiSuccess {Boolean} ack Will be true on success and false on failure.
     *
     * @apiSuccessExample {json} Success-Response:
     *     {
     *          ack: true
     *     }
     *
     * @apiError {String} errorMessage Message of why api call failed.
     *
     * @apiErrorExample {json} Error-Response:
     *     {
     *          ack: false,
     *          errorMessage: 'Token is required.'
     *     }
     */
    private logout(req: Request, res: Response, next: NextFunction): void {
        Async.waterfall([
            (step: (err: string, token: string) => void) => {
                const auth: RequestAuth = new RequestAuth(req)
                if (auth.getToken()) step(null, auth.getToken())
                else step('Token is required.', null)
            },
            (token: string, step: (err: string) => null) => {
                // do stuff to expire session token
                step(null)
            },
        ], (err: string) => {
            if (err)
                res.status(200)
                .send({
                    ack: false,
                    errorMessage: err,
                })
            else
                res.status(200)
                .send({
                    ack: true,
                })
        })
    }
}
