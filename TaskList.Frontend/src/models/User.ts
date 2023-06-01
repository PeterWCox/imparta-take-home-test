export interface User {
    id: number
    name: string
    email: string
    token: string
}

export type LoginRequest = {
    username: string
    password: string
}

export type RegistrationRequest = {
    username: string
    email: string
    password: string
}

export type RegistationResponse = {
    status: string
    message: string
}

export type LoginResponseSuccess = {
    //"ey....sx"
    token: string
    //""2023-06-01T09:38:53Z""
    expiration: Date
}

export type LoginResponseFailure = {
    //"https://tools.ietf.org/html/rfc7235#section-3.1"
    type: string
    //"Unauthorized"
    title: string
    //401
    status: number
    //"00-67902dd48246df79c06ced83b71aaea7-0fdefac6bd84d626-00"
    traceId: string
}
