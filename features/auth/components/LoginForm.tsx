'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../schemas/login.schema';

export default function LoginForm() {
    const router = useRouter();
    const loginMutation = useLogin();

    const [form, setForm] = useState({
        email: '',
        name: '',
        password: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const isDisabled = useMemo(() => {
        return !form.email || !form.name || !form.password || loginMutation.isPending;
    }, [form, loginMutation.isPending]);

    const handleChange = (field: 'email' | 'name' | 'password', value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: '',
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const parsed = loginSchema.safeParse(form);

        if (!parsed.success) {
            const fieldErrors: Record<string, string> = {};

            parsed.error.issues.forEach((issue) => {
                const fieldName = issue.path[0];
                if (typeof fieldName === 'string') {
                    fieldErrors[fieldName] = issue.message;
                }
            });

            setErrors(fieldErrors);
            return;
        }

        try {
            const result = await loginMutation.mutateAsync(form);

            alert(result.message);

            router.push('/dashboard');
        } catch (error) {
            const message =
                error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.';
            alert(message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-xl border p-6 shadow-sm"
        >
            <h1 className="text-2xl font-bold">로그인</h1>

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium">
                    이메일
                </label>
                <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="rounded-md border px-3 py-2 outline-none"
                    placeholder="email@example.com"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium">
                    이름
                </label>
                <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="rounded-md border px-3 py-2 outline-none"
                    placeholder="홍길동"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium">
                    비밀번호
                </label>
                <input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="rounded-md border px-3 py-2 outline-none"
                    placeholder="비밀번호 입력"
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <button
                type="submit"
                disabled={isDisabled}
                className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
            >
                {loginMutation.isPending ? '로그인 중...' : '로그인'}
            </button>
        </form>
    );
}