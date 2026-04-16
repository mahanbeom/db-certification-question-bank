import type { Question } from '../types/question.type';
import QuestionChoiceList from './QuestionChoiceList';

interface Props {
    question: Question;
}

export default function QuestionCard({ question }: Props) {
    return (
        <article
            style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: '#ffffff',
                marginBottom: '16px',
            }}
        >
            <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '6px' }}>
                    {question.exam_rounds?.exam_name} {question.exam_rounds?.round_no}회
                </div>

                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '6px' }}>
                    과목: {question.subject_name} / 난이도: {question.difficulty || '-'}
                </div>

                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>
                    {question.question_no}. {question.question_text}
                </h2>
            </div>

            <QuestionChoiceList choices={question.question_choices} />
        </article>
    );
}