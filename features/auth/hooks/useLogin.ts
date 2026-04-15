'use client';

import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth.api';
import { LoginRequest } from '../types/auth.type';

export function useLogin() {
    return useMutation({
        mutationFn: (data: LoginRequest) => login(data),
    });
}