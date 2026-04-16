export interface QuestionChoice {
    id: number;
    question_id: number;
    choice_no: number;
    choice_text: string;
    created_at: string;
}

export interface ExamRound {
    id: number;
    round_no: number;
    exam_name: string;
    exam_date: string | null;
    created_at: string;
}

export interface Question {
    id: number;
    exam_round_id: number;
    subject_code: string;
    subject_name: string;
    question_no: number;
    question_type: string;
    question_text: string;
    explanation: string | null;
    correct_choice_no: number;
    difficulty: string | null;
    created_at: string;
    updated_at: string;
    exam_rounds: ExamRound | null;
    question_choices: QuestionChoice[];
}

export interface GetQuestionsParams {
    subject_name?: string;
    exam_round_id?: number;
}

export interface GetQuestionsResponse {
    data: Question[];
}