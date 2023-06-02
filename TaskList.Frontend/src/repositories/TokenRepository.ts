export interface ITokenRepository {
    getToken(): string | null | undefined
    setToken(token: string): void
}

export class TokenRepository_Cookie implements ITokenRepository {
    private _cookieKey = 'tkn'

    public getToken = (): string | null | undefined => {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith(this._cookieKey))
            ?.split('=')[1]

        return token
    }

    public setToken = (token: string): void => {
        document.cookie = `${this._cookieKey}=${token}`
    }

    public deleteToken = (): void => {
        document.cookie = `${this._cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }
}
