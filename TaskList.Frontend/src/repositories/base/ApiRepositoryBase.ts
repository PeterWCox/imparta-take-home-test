import axios from 'axios'

export class ApiRepository<T> {
    //Private members
    private _baseUrl: string = ''
    private _fullUrl = (path: string) => `${this._baseUrl}${path}`

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl
    }

    public async get(url: string): Promise<T> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.get<T>(fullUrl)
        return response.data
    }

    public async post(url: string, body: any): Promise<T> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.post<T>(fullUrl, body)
        return response.data
    }

    public async put(url: string, body: any): Promise<T> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.put<T>(fullUrl, body)
        return response.data
    }

    public async delete(url: string): Promise<T> {
        const fullUrl = this._fullUrl(url)

        //Convert the request to axios equivelant
        const response = await axios.delete<T>(fullUrl)
        return response.data
    }

    private getHeaders(): Headers {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')
        return headers
    }
}
