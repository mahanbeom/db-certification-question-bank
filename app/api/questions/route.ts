import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/shared/lib/supabase/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const subjectName = searchParams.get('subject_name');
        const examRoundId = searchParams.get('exam_round_id');

        const supabase = await getSupabaseServer();

        let query = supabase
            .from('questions')
            .select(`
        id,
        exam_round_id,
        subject_code,
        subject_name,
        question_no,
        question_type,
        question_text,
        explanation,
        correct_choice_no,
        difficulty,
        created_at,
        updated_at,
        exam_rounds (
          id,
          round_no,
          exam_name,
          exam_date,
          created_at
        ),
        question_choices (
          id,
          question_id,
          choice_no,
          choice_text,
          created_at
        )
      `)
            .order('question_no', { ascending: true });

        if (subjectName) {
            query = query.eq('subject_name', subjectName);
        }

        if (examRoundId) {
            query = query.eq('exam_round_id', Number(examRoundId));
        }

        const { data, error } = await query;

        if (error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ data: data ?? [] });
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : '문제 목록 조회 중 오류가 발생했습니다.',
            },
            { status: 500 }
        );
    }
}