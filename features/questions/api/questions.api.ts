import type {
    GetQuestionsParams,
    GetQuestionsResponse,
} from '../types/question.type';

export async function getQuestions(
    params?: GetQuestionsParams
): Promise<GetQuestionsResponse> {
    const searchParams = new URLSearchParams();

    if (params?.subject_name) {
        searchParams.set('subject_name', params.subject_name);
    }

    if (params?.exam_round_id) {
        searchParams.set('exam_round_id', String(params.exam_round_id));
    }

    const queryString = searchParams.toString();
    const url = queryString ? `/api/questions?${queryString}` : '/api/questions';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || '문제 목록 조회에 실패했습니다.');
    }

    return response.json();
}