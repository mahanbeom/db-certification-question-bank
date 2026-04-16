'use client';

import { useMemo, useState } from 'react';
import { useQuestions } from '../hooks/useQuestions';
import QuestionCard from './QuestionCard';
import QuestionFilter from './QuestionFilter';

export default function QuestionsPageClient() {
    const [subjectName, setSubjectName] = useState('');
    const [examRoundId, setExamRoundId] = useState('');

    const queryParams = useMemo(() => {
        return {
            subject_name: subjectName || undefined,
            exam_round_id: examRoundId ? Number(examRoundId) : undefined,
        };
    }, [subjectName, examRoundId]);

    const { data, isLoading, isError, error } = useQuestions(queryParams);

    const questions = data?.data ?? [];

    return (
        <section style={{ padding: '24px' }}>
            <header style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                    문제 목록
                </h1>
                <p style={{ color: '#6b7280', margin: 0 }}>
                    회차와 과목 기준으로 문제를 조회할 수 있습니다.
                </p>
            </header>

            <QuestionFilter
                subjectName={subjectName}
                examRoundId={examRoundId}
                onChangeSubjectName={setSubjectName}
                onChangeExamRoundId={setExamRoundId}
            />

            {isLoading && <p>문제 목록을 불러오는 중입니다...</p>}

            {isError && (
                <p style={{ color: 'red' }}>
                    {(error as Error)?.message || '문제 목록 조회 중 오류가 발생했습니다.'}
                </p>
            )}

            {!isLoading && !isError && questions.length === 0 && (
                <p>조회된 문제가 없습니다.</p>
            )}

            {!isLoading &&
                !isError &&
                questions.map((question) => (
                    <QuestionCard key={question.id} question={question} />
                ))}
        </section>
    );
}