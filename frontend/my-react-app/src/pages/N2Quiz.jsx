import Quiz from '../components/Quiz.jsx';
import { questions } from '../question.js';

const N2Quiz = () => {
  return <Quiz level="N2" questions={questions.N2} />;
};

export default N2Quiz;