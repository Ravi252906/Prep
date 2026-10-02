import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TestInstructions from '../components/mock/TestInstructions';
import { mockTests } from '../data/mockTests';

const MockTestInstructions = () => {
  const navigate = useNavigate();
  const { testId } = useParams();
  const test = mockTests.find(t => t.id === testId);

  if (!test) {
    return (
      <div className="p-6">
        <div className="card p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Test Not Found</h2>
          <p className="text-gray-500 mb-4">The requested test could not be found.</p>
          <button
            onClick={() => navigate('/mock-tests')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to Mock Tests
          </button>
        </div>
      </div>
    );
  }

  const handleStart = () => {
    navigate(`/mock-tests/${testId}`);
  };

  const handleCancel = () => {
    navigate('/mock-tests');
  };

  return (
    <div className="p-6">
      <TestInstructions
        test={test}
        onStart={handleStart}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default MockTestInstructions;
