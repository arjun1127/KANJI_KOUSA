import Quiz from '../components/Quiz';
import { questions } from '../question.js';

const N3Quiz = () => {
  return <Quiz level="N3" questions={questions.N3} />;
};

export default N3Quiz;