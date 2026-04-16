'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLogin } from '../hooks/useLogin';
import { loginSchema, LoginSchema } from '../schemas/login.schema';
import { setStoredUser } from '../utils/auth.storage';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginForm() {
    const router = useRouter();
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            name: '',
            password: '',
        },
    });

    const onSubmit = async (values: LoginSchema) => {
        try {
            const result = await loginMutation.mutateAsync(values);

            if (result.user) {
                setStoredUser(result.user);
            }

            alert(result.message);
            router.push('/dashboard');
        } catch (error) {
            const message =
                error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.';
            alert(message);
        }
    };

    return (
        <Card className="mx-auto w-full max-w-md rounded-2xl shadow-sm">
            <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold">로그인</CardTitle>
                <CardDescription>
                    이메일, 이름, 비밀번호를 입력하면 로그인하거나 최초 계정이 생성됩니다.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="email">이메일</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">이름</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="홍길동"
                            {...register('name')}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">비밀번호</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="비밀번호 입력"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {loginMutation.isError && (
                        <p className="text-sm text-red-500">
                            {loginMutation.error instanceof Error
                                ? loginMutation.error.message
                                : '로그인 요청 중 오류가 발생했습니다.'}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={!isValid || loginMutation.isPending}
                        className="w-full"
                    >
                        {loginMutation.isPending ? '로그인 중...' : '로그인'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}