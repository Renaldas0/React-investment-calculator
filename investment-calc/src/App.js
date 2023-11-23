import React, { useState } from 'react';
import './index.css';
import Header from './Components/Header';
import Form from './Components/Form';
import ResultsTable from './Components/ResultsTable';


function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  }
  const yearlyData = []; // per-year results

  if (userInput) {
    let currentSavings = +userInput['current-savings'];
    const yearlyContribution = +userInput['yearly-contribution'];
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({

        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  };

  return (
    <div>

      <Header />
      <Form onCalculate={calculateHandler} />

      {!userInput && <p style={{ textAlign: 'center' }}>No Investment Calculation available, please enter your criteria.</p>}
      {userInput && <ResultsTable yearlyData={yearlyData} initialInvestment={userInput['current-savings']} />}

    </div>
  );
}

export default App;
