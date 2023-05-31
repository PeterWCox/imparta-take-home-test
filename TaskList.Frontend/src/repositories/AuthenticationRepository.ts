import {
    LoginRequest,
    LoginResponseFailure,
    LoginResponseSuccess,
    RegistationResponse,
    RegistrationRequest,
} from '../models/User'

export interface IAuthenticationRepository {
    login(
        loginModel: LoginRequest
    ): Promise<LoginResponseSuccess | LoginResponseFailure>
    register(registerModel: RegistrationRequest): Promise<RegistationResponse>
    logout(): Promise<void>
}

export class AuthenticationRepository implements IAuthenticationRepository {
    public login(
        loginModel: LoginRequest
    ): Promise<LoginResponseSuccess | LoginResponseFailure> {
        throw new Error('Method not implemented.')
    }
    public register(
        registerModel: RegistrationRequest
    ): Promise<RegistationResponse> {
        throw new Error('Method not implemented.')
    }
    public logout(): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
