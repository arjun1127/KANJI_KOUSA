import Quiz from '../components/Quiz';
import { questions } from '../question.js';

const N4Quiz = () => {
  return <Quiz level="N4" questions={questions.N4} />;
};

export default N4Quiz;