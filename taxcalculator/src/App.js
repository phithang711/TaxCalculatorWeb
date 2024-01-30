import { useState } from 'react';

export default function Form() {
  const [salary, setSalary] = useState({
    grossSalary: 0,
    baseSalary: 0,
    netSalary: 0,
  })

  function handleGrossSalary(e) {
    setSalary({...salary,grossSalary: e.target.value});
  }

  function handleBaseSalary(e) {
    setSalary({...salary, baseSalary: e.target.value});
  }

  function calculateNetSalary() {
    const result = salary.grossSalary / 10;
    return result;
  }

  return (
    <>
      <label>
        Gross salary:
        <input
          placeholder='Input gross salary'
          value={salary.grossSalary}
          onChange={handleGrossSalary}
        />
      </label>
      <p></p>
      <label>
        Base salary:
        <input
          placeholder='Input base salary'
          value={salary.baseSalary}
          onChange={handleBaseSalary}
        />
      </label>
      <p>
        Your net salary is: 
      </p>
      <p>
        {calculateNetSalary()}
      </p>
    </>
  );
}
