export interface User {
    name: string
    email: string
}

export interface LoginRequest {
    username: string
    password: string
}

export interface RegistrationRequest {
    username: string
    email: string
    password: string
}

export interface RegistationResponse {
    status: string
    message: string
}

export interface LoginResponseSuccess {
    token: string
    expiration: Date
}

export interface LoginResponseFailure {
    type: string
    title: string
    status: number
    traceId: string
}
