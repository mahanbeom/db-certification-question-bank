export interface LoginRequest {
    email: string;
    name: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    user?: {
        id: string;
        email: string;
        name: string;
    };
}