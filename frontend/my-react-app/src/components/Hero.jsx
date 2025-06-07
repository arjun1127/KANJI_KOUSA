import { Link } from 'react-router-dom';
import Image from '../assets/image.png';
import { useAuth0 } from '@auth0/auth0-react';

const Hero = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'multiply',
      }}
    >
      
      <section className="text-center py-16 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-cyan-400 mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
          Master Basic Kanji with Ease
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
          Dive into the world of Japanese writing. Start learning essential kanji characters that build the foundation for language mastery.
        </p>

        {!isAuthenticated && (
          <div className="bg-gray-800 bg-opacity-70 p-4 rounded-xl max-w-xl mx-auto mt-4 shadow-md">
            <p className="text-cyan-300 font-semibold text-lg mb-2">
               Sign up to unlock the AI-powered Kanji learning assistant!
            </p>
            <p className="text-sm text-gray-300">
              Please <span className="underline decoration-dotted">sign up</span> to get started with quizzes and personalized practice.
            </p>
            <p
            className="text-sm text-gray-300 font-semibold animate-bounce text-center mt-3"
            style={{
              textShadow: '0 0 8px #00ffff, 0 0 12px #00ffff',
              color: '#a5f3fc', // Light cyan
            }}
          >
            ⚠️ Please Note: Once you sign up, you will need to verify your email. After verification, you can log in to access the app.
          </p>
          </div>
        )}
      </section>

     
      <section className="py-10 px-6 text-center">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-6">
          
          <Link
            to="/flashcards"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 sm:px-8 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            📚 More Kanji
          </Link>

          {['n5', 'n4', 'n3', 'n2', 'n1'].map((level) => (
            <Link
              key={level}
              to={`/quiz/${level}`}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 sm:px-8 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105"
            >
              📝 Quiz {level.toUpperCase()}
            </Link>
          ))}

          
          {isAuthenticated && (
            <Link
              to="/chatBot"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 sm:px-8 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105"
            >
               Learn With AI
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hero;
