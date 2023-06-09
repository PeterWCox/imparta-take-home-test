import { TokenDetails } from '../models/User'

export interface ITokenRepository {
    getToken(): TokenDetails | null
    setToken(tokenDetails: TokenDetails): void
    deleteToken(): void
}

export class TokenRepository_Cookie implements ITokenRepository {
    private _cookieKey = 'tkn'

    public getToken = (): TokenDetails | null => {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith(this._cookieKey))
            ?.split('=')[1]

        if (!token) {
            return null
        }

        return {
            token: token,
            expiration: '',
        }
    }

    public setToken = (tokenDetails: TokenDetails): void => {
        document.cookie = `${this._cookieKey}=${tokenDetails.token}; expires=${tokenDetails.expiration}`
    }

    public deleteToken = (): void => {
        document.cookie = `${this._cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
    }
}
