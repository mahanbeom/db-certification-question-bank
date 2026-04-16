import type { QuestionChoice } from '../types/question.type';

interface Props {
    choices: QuestionChoice[];
}

export default function QuestionChoiceList({ choices }: Props) {
    const sortedChoices = [...choices].sort((a, b) => a.choice_no - b.choice_no);

    return (
        <ol style={{ paddingLeft: '20px', marginTop: '12px' }}>
            {sortedChoices.map((choice) => (
                <li key={choice.id} style={{ marginBottom: '8px' }}>
                    {choice.choice_text}
                </li>
            ))}
        </ol>
    );
}