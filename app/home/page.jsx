'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/fetchquestions');
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          console.error('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching questions', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionClick = (id) => {
    router.push(`/question/${id}`);
  };

  return (
    <div id="background" className="relative overflow-hidden bg-[#101828] min-h-screen flex flex-col justify-between text-white">
      {/* Floating Circles Background */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <div className="circle bg-white opacity-20 animate-float w-[250px] h-[250px] rounded-full absolute top-[10%] left-[20%]"></div>
        <div className="circle bg-white opacity-20 animate-float w-[300px] h-[300px] rounded-full absolute top-[50%] left-[70%]"></div>
        <div className="circle bg-white opacity-20 animate-float w-[150px] h-[150px] rounded-full absolute bottom-[20%] left-[40%]"></div>
      </div>

      <div className="min-w-[80%] mx-auto my-12 bg-[#1E2939] rounded-3xl p-8 shadow-xl backdrop-blur-md">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4">Programmers</h1>
        </header>

        <main className="space-y-8">
          {loading ? (
            <p className="text-center text-lg text-gray-300">Loading questions...</p>
          ) : questions.length > 0 ? (
            questions.map((question, index) => (
              <div key={question._id} className="bg-[#121418] bg-opacity-10 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
                <h2 className="text-2xl font-semibold mb-2">Question {index + 1}</h2>
                <p className="mb-4">{question.questionText}</p>
                <div className="text-right">
                  <button
                    onClick={() => handleQuestionClick(question._id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-300">No questions available right now.</p>
          )}
        </main>
      </div>

      <footer className="bg-gradient-to-r from-[#0e0f4c] via-[#2c3e50] to-[#34495e] backdrop-blur-md mt-10 p-8 rounded-t-3xl shadow-inner">
  <div className="flex flex-col items-center space-y-4">
    <img
      src="/images/hod_photo.jpg"
      alt="HOD Mam"
      className="w-28 h-28 rounded-full border-4 border-indigo-400 shadow-lg object-cover"
    />
    <div className="text-center">
      <p className="text-gray-300 text-lg font-sans">Special Thanks to</p>
      <h3 className="text-gray-100 text-2xl font-bold mt-1 font-serif">Epsiba Mam</h3>
      <p className="text-gray-300 text-md mt-2 font-sans">
        Designed by: <span className="font-semibold text-teal-400">Ganesh baby, Jashwanth</span>
      </p>
      <p className="text-gray-300 text-md mt-2 font-sans">
        Developed by: <span className="font-semibold text-teal-400">Vijay</span>
      </p>
    </div>
  </div>
</footer>



      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Page;
