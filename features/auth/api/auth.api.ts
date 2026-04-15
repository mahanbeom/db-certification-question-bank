import { LoginRequest, LoginResponse } from '../types/auth.type';

export async function login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = (await response.json()) as LoginResponse;

    if (!response.ok) {
        throw new Error(result.message || '로그인 중 오류가 발생했습니다.');
    }

    return result;
}