import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { supabaseClient } from '@/shared/lib/supabase/client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, password } = body as {
            email?: string;
            name?: string;
            password?: string;
        };

        if (!email || !name || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: '필수값이 누락되었습니다.',
                },
                { status: 400 }
            );
        }

        const { data: existingUser, error: findError } = await supabaseClient
            .from('users')
            .select('id, email, name, password')
            .eq('email', email)
            .maybeSingle();

        if (findError) {
            return NextResponse.json(
                {
                    success: false,
                    message: '사용자 조회 중 오류가 발생했습니다.',
                },
                { status: 500 }
            );
        }

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const { data: createdUser, error: createError } = await supabaseClient
                .from('users')
                .insert({
                    email,
                    name,
                    password: hashedPassword,
                })
                .select('id, email, name')
                .single();

            if (createError) {
                return NextResponse.json(
                    {
                        success: false,
                        message: '사용자 생성 중 오류가 발생했습니다.',
                    },
                    { status: 500 }
                );
            }

            return NextResponse.json({
                success: true,
                message: '최초 로그인으로 계정이 생성되었습니다.',
                user: createdUser,
            });
        }

        const isMatched = await bcrypt.compare(password, existingUser.password);

        if (!isMatched) {
            return NextResponse.json(
                {
                    success: false,
                    message: '비밀번호가 일치하지 않습니다.',
                },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            message: '로그인에 성공했습니다.',
            user: {
                id: existingUser.id,
                email: existingUser.email,
                name: existingUser.name,
            },
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: '서버 오류가 발생했습니다.',
            },
            { status: 500 }
        );
    }
}