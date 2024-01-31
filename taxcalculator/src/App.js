import { useState } from 'react';

export default function Form() {
  const [salary, setSalary] = useState({
    grossSalary: 0,
    baseSalary: 0,
    netSalary: 0,
  })

  const [insurance, setInsurance] = useState({
    total: 0,
    socialInsurance: 0,
    healthInsurance: 0,
    unemploymentInsurance: 0,
  })

  function handleGrossSalary(e) {
    setSalary({...salary,grossSalary: e.target.value});
  }

  function handleBaseSalary(e) {
    setSalary({...salary, baseSalary: e.target.value});
  }

  function calculateNetSalary() {
    calculateInsurance();
    const result = salary.grossSalary - insurance.total;
    return result;
  }

  function calculateInsurance() {
    if (salary.baseSalary > 0) {
      calculateInsuranceWithMoney(salary.baseSalary);
    } else {
      calculateInsuranceWithMoney(salary.grossSalary);
    }
  }

  function calculateInsuranceWithMoney(money) {
    if (money == 0) {
      return;
    }

    setInsurance({...insurance,
      total: money * 0.105, 
      healthInsurance: money * 0.015, 
      socialInsurance: money * 0.08, 
      unemploymentInsurance: money * 0.01  
    })
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
        Insurance is: 
      </p>
      <p>
        insurance.total
      </p>
      <p>
        Your net salary is: 
      </p>
      <p>
        {calculateNetSalary()}
      </p>
    </>
  );
}
