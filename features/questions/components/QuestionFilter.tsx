'use client';

interface Props {
    subjectName: string;
    examRoundId: string;
    onChangeSubjectName: (value: string) => void;
    onChangeExamRoundId: (value: string) => void;
}

export default function QuestionFilter({
    subjectName,
    examRoundId,
    onChangeSubjectName,
    onChangeExamRoundId,
}: Props) {
    return (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px',
                flexWrap: 'wrap',
            }}
        >
            <select
                value={subjectName}
                onChange={(e) => onChangeSubjectName(e.target.value)}
                style={{
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    minWidth: '180px',
                }}
            >
                <option value="">전체 과목</option>
                <option value="데이터 이해">데이터 이해</option>
                <option value="데이터 분석 기획">데이터 분석 기획</option>
                <option value="데이터 분석">데이터 분석</option>
            </select>

            <select
                value={examRoundId}
                onChange={(e) => onChangeExamRoundId(e.target.value)}
                style={{
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    minWidth: '180px',
                }}
            >
                <option value="">전체 회차</option>
                <option value="1">1회</option>
                <option value="2">2회</option>
                <option value="3">3회</option>
            </select>
        </div>
    );
}