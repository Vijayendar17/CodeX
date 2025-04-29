import React, { useEffect, useState } from 'react';

const InputRight = ({ questionId, userInput, setUserInput, handleSubmit, handleUpdate }) => {
  const [existingAnswer, setExistingAnswer] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchAnswer = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        const response = await fetch(`/api/getanswer?questionId=${questionId}`);
        const data = await response.json();

        if (data.success && data.answer) {
          setExistingAnswer(data.answer);
          setUserInput(data.answer.answer);
        } else {
          setExistingAnswer(null);
          setUserInput('');
        }
      } catch (error) {
        console.error('Failed to fetch existing answer:', error);
        setError('Failed to load your previous answer.'); // Set error if fetch fails
      } finally {
        setLoading(false); // Stop loading once fetch completes
      }
    };

    if (questionId) {
      fetchAnswer();
    }
  }, [questionId, setUserInput]);

  // Separate handleUpdate function
  const updateAnswer = async (questionId, answer) => {
    if (!answer.trim()) {
      alert('Please provide an answer before updating.');
      return;
    }

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
        throw new Error('Failed to update answer');
      }

      alert('Your answer has been updated successfully!');
    } catch (error) {
      console.error('Error updating answer:', error);
      setError('Failed to update the answer. Please try again.');
    }
  };

  const onSubmitOrUpdate = async () => {
    setError(null); // Reset error state before attempting submit/update

    try {
      if (existingAnswer) {
        await updateAnswer(questionId, userInput); // Call updateAnswer if there is an existing answer
      } else {
        await handleSubmit(questionId, userInput); // Call handleSubmit for new answer
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="w-1/2 p-6 flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Your Answer</h2>

      {loading && <p className="text-white">Loading existing answer...</p>} {/* Show loading */}
      {error && <p className="text-red-500">{error}</p>} {/* Show error message */}

      <textarea
        className="flex-1 resize-none border border-gray-700 rounded-md p-4 bg-gray-800 text-white font-mono focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        placeholder="Type your answer here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <button
        className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-semibold transition"
        onClick={onSubmitOrUpdate}
        disabled={loading || !userInput.trim()} // Disable button if loading or no input
      >
        {existingAnswer ? 'Update' : 'Submit'}
      </button>
    </div>
  );
};

export default InputRight;
