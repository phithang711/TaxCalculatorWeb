import {useState} from 'react';
import NumberResult from "../NumberResult";
import NumberInput from "../NumberInput";

import './index.css'

export default function Form() {
    const [totalIncome, setTotalIncome] = useState(0);
    const [salary, setSalary] = useState(0);
    const [dependants, setDependants] = useState(0);

    const [income, setIncome] = useState({
        totalIncome: 0,
        salary: 0,
        netIncome: 0,
        employerTotalExpense: 0,
        socialInsurance: {
            employee: 0,
            employer: 0
        },
        tax: {
            totalTax: 0,
            bracket: {
                first: 0, // 0 - 5M
                second: 0, // 5M - 10M
                third: 0, // 10M - 18M
                fourth: 0, // 18M - 32M
                fifth: 0, // 32M - 52M
                sixth: 0, // 52M - 80M
                seventh: 0 // 80M+
            }
        },
        dependantDeduction: 0
    })

    const baseSalary = 1_800_000;
    const taxThreshold = 11_000_000;
    const dependantDeduction = 4_400_000;

    const onInputChange = (e) => {
        const totalIncome = document.getElementById("totalInput").value || 0;
        const salary = document.getElementById("salaryInput").value || 0;
        const dependants = document.getElementById("dependantsInput").value || 0;

        const income = {
            totalIncome: totalIncome,
            salary: salary,
            dependants: dependants
        }

        const newSalary = calculateSalary(income);
        setIncome(newSalary)
    }

    const calculateSalary = (income) => {
        const totalIncome = income.totalIncome;
        const salary = income.salary;
        // calculate social insurance
        const socialInsurance = calculateSocialInsurance(salary);
        // calculate tax
        const tax = calculateTax(totalIncome, socialInsurance, income.dependants);
        // calculate net salary
        const netIncome = totalIncome - socialInsurance.employee - tax.totalTax;

        return {
            totalIncome: totalIncome,
            salary: salary,
            netIncome: netIncome,
            employerTotalExpense: totalIncome + socialInsurance.employer,
            socialInsurance: socialInsurance,
            tax: tax,
            dependantDeduction: dependantDeduction
        }
    }

    const calculateSocialInsurance = (salary) => {
        const employerSocialInsurance = calculateEmployerSocialInsurance(salary);
        const employeeSocialInsurance = calculateEmployeeSocialInsurance(salary);

        return {
            employer: employerSocialInsurance,
            employee: employeeSocialInsurance
        }
    }

    const calculateEmployerSocialInsurance = (salary) => {
        // pension: 14%, sickness: 3%, accident: 0.5%, unemployment: 1%, health: 3% => calculate from salary,
        // if salary exceeds 20 * baseSalary, only on calculate 20 * baseSalary
        const cappedSalary = Math.min(salary, 20 * baseSalary);
        const pension = cappedSalary * 0.14;
        const sickness = cappedSalary * 0.03;
        const accident = cappedSalary * 0.005;
        const unemployment = cappedSalary * 0.01;
        const health = cappedSalary * 0.03;
        return pension + sickness + accident + unemployment + health;
    }

    const calculateTax = (totalIncome, socialInsurance, dependants) => {
        // totalDeductible = dependantDeduction * dependants + taxThreshold
        const totalDeductible = dependantDeduction * dependants + taxThreshold;
        // taxableIncome = totalIncome - socialInsurance
        let taxableIncome = totalIncome - socialInsurance.employee - totalDeductible;
        taxableIncome = Math.max(0, taxableIncome);

        // 0 - 5M: 5%, 5M - 10M: 10%, 10M - 18M: 15%, 18M - 32M: 20%, 32M - 52M: 25%, 52M - 80M: 30%, 80M - 80M: 35%
        // calculate tax by step
        const firstBracket = Math.min(taxableIncome, 5_000_000) * 0.05;
        taxableIncome -= 5_000_000;
        taxableIncome = Math.max(0, taxableIncome);
        const secondBracket = Math.min(taxableIncome, 5_000_000) * 0.1;
        taxableIncome -= 5_000_000;
        taxableIncome = Math.max(0, taxableIncome);
        const thirdBracket = Math.min(taxableIncome, 8_000_000) * 0.15;
        taxableIncome -= 8_000_000;
        taxableIncome = Math.max(0, taxableIncome);
        const fourthBracket = Math.min(taxableIncome, 14_000_000) * 0.2;
        taxableIncome -= 14_000_000;
        taxableIncome = Math.max(0, taxableIncome);
        const fifthBracket = Math.min(taxableIncome, 20_000_000) * 0.25;
        taxableIncome -= 20_000_000;
        taxableIncome = Math.max(0, taxableIncome);
        const sixthBracket = Math.min(taxableIncome, 28_000_000) * 0.3;
        taxableIncome -= 28_000_000;
        taxableIncome = Math.max(0, taxableIncome);
        const seventhBracket = taxableIncome * 0.35;

        return {
            totalTax: seventhBracket + sixthBracket + fifthBracket + fourthBracket + thirdBracket + secondBracket + firstBracket,
            bracket: {
                first: firstBracket,
                second: secondBracket,
                third: thirdBracket,
                fourth: fourthBracket,
                fifth: fifthBracket,
                sixth: sixthBracket,
                seventh: seventhBracket
            }
        };
    }

    const calculateEmployeeSocialInsurance = (salary) => {
        // pension: 8%, unemployment: 1%, health: 1.5% => calculate from salary,
        // if salary exceeds 20 * baseSalary, only on calculate 20 * baseSalary
        const cappedSalary = Math.min(salary, 20 * baseSalary);
        const pension = cappedSalary * 0.08;
        const unemployment = cappedSalary * 0.01;
        const health = cappedSalary * 0.015;
        return pension + unemployment + health;
    }

    return (
        <div className="calculatorForm">
            <NumberInput
                label={"Total income"}
                id={"totalInput"}
                onChange={onInputChange}
                setValueState={setTotalIncome}
                unit={"VND"}
            />

            <NumberInput
                label={"Salary"}
                id={"salaryInput"}
                onChange={onInputChange}
                setValueState={setSalary}
                unit={"VND"}
            />

            <NumberInput
                label={"Dependants"}
                id={"dependantsInput"}
                onChange={onInputChange}
                setValueState={setDependants}
                unit={"person(s)"}
            />

            <NumberResult label={"Total income"} value={income.totalIncome} unit={"VND"}/>
            <NumberResult label={"Net Income"} value={income.salary} unit={"VND"}/>
            <NumberResult label={"Tax"} value={income.tax.totalTax} unit={"VND"}/>

        </div>
    );
}
