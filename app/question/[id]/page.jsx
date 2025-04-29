'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import InputRight from '@/app/components/inputright';

const QuestionDetailPage = () => {
  const params = useParams();
  const [questionDetail, setQuestionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState(null);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (params?.id) {
      const fetchQuestionDetail = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/question/${params.id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setQuestionDetail(data);
        } catch (error) {
          console.error('Error fetching question:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchQuestionDetail();
    }
  }, [params]);

  const handleSubmit = async (questionId, answer) => {
    if (!answer.trim()) {
      alert('Please provide an answer before submitting.');
      return;
    }

    setSubmitError(null);

    try {
      const response = await fetch('/api/submitanswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          answer,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server responded with status ${response.status}`
        );
      }

      const result = await response.json();
      alert('Your answer has been submitted successfully!');
      console.log('Submission successful:', result);
      setUserInput(''); // clear textarea
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error.message || 'Failed to submit the answer');
      alert(`Error: ${error.message || 'Failed to submit the answer'}`);
    }
  };

  const handleUpdate = async (questionId, answer) => {
    if (!answer.trim()) {
      alert('Please provide an answer before updating.');
      return;
    }
    console.log(answer)
    setSubmitError(null);

    try {
      const response = await fetch('/api/updateanswer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          answer,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server responded with status ${response.status}`
        );
      }

      const result = await response.json();
      alert('Your answer has been updated successfully!');
      console.log('Update successful:', result);
    } catch (error) {
      console.error('Update error:', error);
      setSubmitError(error.message || 'Failed to update the answer');
      alert(`Error: ${error.message || 'Failed to update the answer'}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (!questionDetail) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
        <p className="text-gray-400 text-lg">Question not found</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col">
      {submitError && (
        <div className="bg-red-900 text-white p-4 text-center">
          Error: {submitError}
        </div>
      )}
      <div className="flex flex-1">
        {/* Left Side - Question */}
        <div className="w-1/2 border-r border-gray-700 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-4">Question Detail</h1>
          <h2 className="text-2xl font-semibold mb-6">{questionDetail.questionText}</h2>

          <div>
            <p className="text-xl font-semibold mb-4">Examples:</p>
            <ul className="space-y-6">
              {questionDetail.examples && questionDetail.examples.length > 0 ? (
                questionDetail.examples.map((example, index) => (
                  <li key={index} className="bg-gray-800 border border-gray-700 rounded-md p-4">
                    <div className="mb-2">
                      <span className="font-medium text-gray-400">Input:</span>
                      <pre className="bg-gray-700 p-2 rounded mt-1 text-sm text-white">{example.input}</pre>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium text-gray-400">Output:</span>
                      <pre className="bg-gray-700 p-2 rounded mt-1 text-sm text-white">{example.output}</pre>
                    </div>
                    <div>
                      <span className="font-medium text-gray-400">Explanation:</span>
                      <p className="bg-gray-700 p-2 rounded mt-1 text-sm text-white">{example.explanation}</p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No examples available</li>
              )}
            </ul>
          </div>
        </div>

        {/* Right Side - User Input */}
        <InputRight
          userInput={userInput}
          setUserInput={setUserInput}
          handleSubmit={handleSubmit}
          handleUpdate={handleUpdate}
          questionId={params.id} // Pass questionId
        />
      </div>
    </div>
  );
};

export default QuestionDetailPage;
