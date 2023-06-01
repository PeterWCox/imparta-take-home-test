import axios from 'axios'

export class ApiRepository<T> {
    //Private members
    private _baseUrl: string = ''
    private _fullUrl = (path: string) => `${this._baseUrl}${path}`
    private _config: any = {}

    constructor(baseUrl: string, token: string) {
        this._baseUrl = baseUrl
        this._config = {
            headers: {
                Authorization: `Bearer ${token}`,
                AccessControlAllowOrigin: '*',
                Accept: 'application/json',
                ContentType: 'application/json',
            },
        }
    }

    public async get(url: string): Promise<T[]> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.get<T[]>(fullUrl, this._config)

        return response.data
    }

    public async add(url: string, body: any): Promise<T> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.post<T>(fullUrl, body, this._config)
        return response.data
    }

    public async update(url: string, body: any): Promise<T> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.put<T>(fullUrl, body, this._config)
        return response.data
    }

    public async delete(url: string): Promise<T> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.delete<T>(fullUrl, this._config)
        return response.data
    }
}
