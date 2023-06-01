import axios, { AxiosError } from 'axios'
import { LoginRequest } from '../models/User'
import { ApiRepository } from './base/ApiRepositoryBase'

export interface LoginResponse {
    token: string | null
    error: string | null
}

export interface IAuthenticationRepository {
    login(request: LoginRequest): Promise<LoginResponse>
}

export class AuthenticationRepositoryApi
    extends ApiRepository<LoginRequest>
    implements IAuthenticationRepository
{
    constructor(baseUrl: string, token: string) {
        super(baseUrl, token)
    }

    public login = async (request: LoginRequest): Promise<LoginResponse> => {
        try {
            const fullUrl = 'http://localhost:24288/api/Authentication/login'

            const response = await axios.post(fullUrl, request, {
                headers: {
                    AccessControlAllowOrigin: '*',
                    Accept: 'application/json',
                    ContentType: 'application/json',
                },
            })

            return {
                token: response.data.token,
                error: null,
            }
        } catch (err) {
            const errors = err as Error | AxiosError
            if (!axios.isAxiosError(errors)) {
            }
            return {
                token: null,
                error: errors.message,
            }
        }
    }
}
