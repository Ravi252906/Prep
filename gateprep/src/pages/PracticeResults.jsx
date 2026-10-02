import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeResult from '../components/practice/PracticeResult';

const PracticeResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const resultsData = localStorage.getItem('practiceResults');
    if (resultsData) {
      setResults(JSON.parse(resultsData));
    } else {
      navigate('/practice/setup');
    }
  }, [navigate]);

  const handleRetry = () => {
    navigate('/practice/setup');
  };

  const handleReview = () => {
    navigate('/practice/review');
  };

  const handleBack = () => {
    navigate('/practice/setup');
  };

  if (!results) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <PracticeResult
        results={results}
        onRetry={handleRetry}
        onReview={handleReview}
        onBack={handleBack}
      />
    </div>
  );
};

export default PracticeResults;
