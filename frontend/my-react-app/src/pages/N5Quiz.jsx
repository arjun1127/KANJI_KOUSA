import Quiz from '../components/Quiz';
import { questions } from '../question.js';

const N5Quiz = () => {
  return <Quiz level="N5" questions={questions.N5} />;
};

export default N5Quiz;