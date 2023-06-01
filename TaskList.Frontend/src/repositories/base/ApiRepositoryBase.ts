import axios from 'axios'

export class ApiRepository<T> {
    //Private members
    private _baseUrl: string = ''
    private _token: string = ''
    private _fullUrl = (path: string) => `${this._baseUrl}${path}`

    constructor(baseUrl: string, token: string) {
        this._baseUrl = baseUrl
        this._token = token
    }

    public async get(url: string): Promise<T[]> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.get<T[]>(fullUrl, {
            headers: {
                Authorization: `Bearer ${this._token}`,
                Accept: 'application/json',
                ContentType: 'application/json',
            },
        })

        return response.data
    }

    public async add(url: string, body: any): Promise<T> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.post<T>(fullUrl, body, {
            headers: {
                Authorization: `Bearer ${this._token}`,
                Accept: 'application/json',
                ContentType: 'application/json',
            },
        })
        return response.data
    }

    public async put(url: string, body: any): Promise<T> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.put<T>(fullUrl, body, {
            headers: {
                Authorization: `Bearer ${this._token}`,
                Accept: 'application/json',
                ContentType: 'application/json',
            },
        })
        return response.data
    }

    public async delete(url: string): Promise<T> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.delete<T>(fullUrl, {
            headers: {
                Authorization: `Bearer ${this._token}`,
                Accept: 'application/json',
                ContentType: 'application/json',
            },
        })
        return response.data
    }
}
