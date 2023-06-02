import axios from 'axios'
import { Constants } from '../../utils/Constants'

export class ApiRepository<T> {
    //Private members
    private _fullUrl = (path: string) => `${Constants.BASE_URL}/${path}`
    private _config: any = {}

    //Constructor
    constructor(token: string) {
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
