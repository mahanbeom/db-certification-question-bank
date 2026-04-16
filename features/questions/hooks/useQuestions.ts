'use client';

import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '../api/questions.api';
import type { GetQuestionsParams } from '../types/question.type';

export const questionKeys = {
    all: ['questions'] as const,
    lists: () => [...questionKeys.all, 'list'] as const,
    list: (params?: GetQuestionsParams) =>
        [...questionKeys.lists(), params] as const,
};

export function useQuestions(params?: GetQuestionsParams) {
    return useQuery({
        queryKey: questionKeys.list(params),
        queryFn: () => getQuestions(params),
        staleTime: 1000 * 60,
    });
}