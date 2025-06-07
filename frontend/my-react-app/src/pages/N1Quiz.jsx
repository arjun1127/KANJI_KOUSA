import Quiz from '../components/Quiz';
import { questions } from '../question.js';

const N1Quiz = () => {
  return <Quiz level="N1" questions={questions.N1} />;
};

export default N1Quiz;