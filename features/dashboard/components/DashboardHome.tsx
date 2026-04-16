'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, LogOut, UserRound, ChevronRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import {
    getStoredUser,
    removeStoredUser,
    StoredUser,
} from '@/features/auth/utils/auth.storage';

export default function DashboardHome() {
    const router = useRouter();
    const [user, setUser] = useState<StoredUser | null>(null);

    useEffect(() => {
        const storedUser = getStoredUser();

        if (!storedUser) {
            router.replace('/auth/login');
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(storedUser);
    }, [router]);

    const handleLogout = () => {
        removeStoredUser();
        router.replace('/auth/login');
    };

    const handleMoveToQuestions = () => {
        router.push('/questions');
    };

    if (!user) {
        return null;
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                <section className="rounded-2xl border bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100">
                                <UserRound className="h-7 w-7 text-slate-600" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-2xl font-bold">{user.name}님</h1>
                                    <Badge variant="secondary">문제 학습</Badge>
                                </div>

                                <p className="text-sm text-slate-500">{user.email}</p>
                                <p className="text-sm text-slate-600">
                                    오늘도 문제를 풀면서 학습을 이어가보세요.
                                </p>
                            </div>
                        </div>

                        <Button variant="outline" onClick={handleLogout} className="gap-2 self-start">
                            <LogOut className="h-4 w-4" />
                            로그아웃
                        </Button>
                    </div>
                </section>

                <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                    <Card className="rounded-2xl shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <BookOpen className="h-5 w-5" />
                                문제 풀기
                            </CardTitle>
                            <CardDescription>
                                문제를 선택하고 바로 풀이를 시작할 수 있습니다.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <div className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-600">
                                객관식, 과목별 풀이, 오답 복습 등으로 확장 가능한 기본 진입 카드입니다.
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-xl border bg-white p-4">
                                    <p className="text-sm text-slate-500">전체 문제</p>
                                    <p className="mt-2 text-2xl font-bold">0</p>
                                </div>

                                <div className="rounded-xl border bg-white p-4">
                                    <p className="text-sm text-slate-500">오늘 푼 문제</p>
                                    <p className="mt-2 text-2xl font-bold">0</p>
                                </div>

                                <div className="rounded-xl border bg-white p-4">
                                    <p className="text-sm text-slate-500">오답 문제</p>
                                    <p className="mt-2 text-2xl font-bold">0</p>
                                </div>
                            </div>

                            <Button onClick={handleMoveToQuestions} className="w-full gap-2 sm:w-auto">
                                문제 풀기 화면으로 이동
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl">내 정보</CardTitle>
                            <CardDescription>
                                로그인한 사용자 정보를 간단히 보여줍니다.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-slate-500">이름</p>
                                <p className="mt-1 font-medium">{user.name}</p>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-sm text-slate-500">이메일</p>
                                <p className="mt-1 font-medium">{user.email}</p>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-sm text-slate-500">상태</p>
                                <p className="mt-1 font-medium">학습 준비 완료</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    );
}