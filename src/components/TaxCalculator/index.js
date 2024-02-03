import {useEffect, useState} from 'react';
import NumberResult from "../NumberResult";
import NumberInput from "../NumberInput";

import './index.css'

const BASE_SALARY = 1_800_000;
const TAX_THRESHOLD = 11_000_000;
const DEPENDANT_DEDUCTION = 4_400_000;
const TAX_BRACKETS = [
    { limit: 5_000_000, rate: 0.05 },
    { limit: 5_000_000, rate: 0.10 },
    { limit: 8_000_000, rate: 0.15 },
    { limit: 14_000_000, rate: 0.20 },
    { limit: 20_000_000, rate: 0.25 },
    { limit: 28_000_000, rate: 0.30 },
    { limit: Infinity, rate: 0.35 }
];

export default function TaxCalculator() {
    const [totalIncomeInputVal, setTotalIncomeInputVal] = useState(0);
    const [salaryInputVal, setSalaryInputVal] = useState(0);
    const [dependantsInputVal, setDependantsInputVal] = useState(0);

    const [income, setIncome] = useState({
        totalIncome: 0,
        salary: 0,
        netIncome: 0,
        employerTotalExpense: 0,
        socialInsurance: {
            employee: {
                total: 0,
                pension: 0,
                unemployment: 0,
                health: 0
            },
            employer: {
                total: 0,
                pension: 0,
                sickness: 0,
                accident: 0,
                unemployment: 0,
                health: 0
            }
        },
        tax: {
            totalTax: 0,
            bracket: {
                bracket1: 0, // 0 - 5M
                bracket2: 0, // 5M - 10M
                bracket3: 0, // 10M - 18M
                bracket4: 0, // 18M - 32M
                bracket5: 0, // 32M - 52M
                bracket6: 0, // 52M - 80M
                bracket7: 0 // 80M+
            }
        },
        dependantDeduction: 0
    })

    const onInputChange = (e) => {
        const totalIncome = parseInt(totalIncomeInputVal) || 0;
        const salary = parseInt(salaryInputVal) || 0;
        const dependants= parseInt(dependantsInputVal) || 0;

        const income = {
            totalIncome: totalIncome,
            salary: salary,
            dependants: dependants
        }

        const newSalary = calculateSalary(income);
        // noinspection JSCheckFunctionSignatures
        setIncome(newSalary)
    }

    useEffect(() => {
        onInputChange();
    }, [totalIncomeInputVal, salaryInputVal, dependantsInputVal]);

    const calculateSalary = (income) => {
        const totalIncome = income.totalIncome;
        const salary = income.salary;
        // calculate social insurance
        const socialInsurance = calculateSocialInsurance(salary);
        console.log(socialInsurance);
        // calculate tax
        const tax = calculateTax(totalIncome, socialInsurance, income.dependants);
        // calculate net salaryInputVal
        const netIncome = totalIncome - socialInsurance.employee.total - tax.totalTax;

        return {
            totalIncome: totalIncome,
            salary: salary,
            netIncome: netIncome,
            employerTotalExpense: totalIncome + socialInsurance.employer.total,
            socialInsurance: socialInsurance,
            tax: tax,
            dependantDeduction: income.dependants * DEPENDANT_DEDUCTION
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
        // pension: 14%, sickness: 3%, accident: 0.5%, unemployment: 1%, health: 3% => calculate from salaryInputVal,
        // if salaryInputVal exceeds 20 * BASE_SALARY, only on calculate 20 * BASE_SALARY
        const cappedSalary = Math.min(salary, 20 * BASE_SALARY);
        const pension = cappedSalary * 0.14;
        const sickness = cappedSalary * 0.03;
        const accident = cappedSalary * 0.005;
        const unemployment = cappedSalary * 0.01;
        const health = cappedSalary * 0.03;
        return {
            total: pension + sickness + accident + unemployment + health,
            pension: pension,
            sickness: sickness,
            accident: accident,
            unemployment: unemployment,
            health: health
        }
    }

const calculateTax = (totalIncome, socialInsurance, dependants) => {
    const totalDeductible = DEPENDANT_DEDUCTION * dependants + TAX_THRESHOLD;
    let taxableIncome = Math.max(0, totalIncome - socialInsurance.employee.total - totalDeductible);
    console.log({totalIncome, socialInsurance, dependants, totalDeductible, taxableIncome});

    let totalTax = 0;
    const bracket = {};

    TAX_BRACKETS.forEach((bracketInfo, index) => {
        console.log("--------------------");
        console.log(index);
        console.log(bracketInfo);
        console.log(taxableIncome);
        const taxForBracket = Math.min(taxableIncome, bracketInfo.limit) * bracketInfo.rate;
        taxableIncome = Math.max(0, taxableIncome - bracketInfo.limit);
        totalTax += taxForBracket;
        bracket[`bracket${index + 1}`] = taxForBracket;
    });
    console.log(totalTax, bracket);

    return {
        totalTax,
        bracket
    };
}
    const calculateEmployeeSocialInsurance = (salary) => {
        // pension: 8%, unemployment: 1%, health: 1.5% => calculate from salaryInputVal,
        // if salaryInputVal exceeds 20 * BASE_SALARY, only on calculate 20 * BASE_SALARY
        const cappedSalary = Math.min(salary, 20 * BASE_SALARY);
        const pension = cappedSalary * 0.08;
        const unemployment = cappedSalary * 0.01;
        const health = cappedSalary * 0.015;
        return {
            total: pension + unemployment + health,
            pension: pension,
            unemployment: unemployment,
            health: health
        }
    }

    return (
        <div className="calculatorForm">
            <NumberInput
                label={"Total income (gross salary)"}
                id={"totalInput"}
                setValueState={setTotalIncomeInputVal}
                unit={"VND"}
            />

            <NumberInput
                label={"Salary (Salary for Insurance calculation)"}
                id={"salaryInput"}
                setValueState={setSalaryInputVal}
                unit={"VND"}
            />

            <NumberInput
                label={"Dependants"}
                id={"dependantsInput"}
                setValueState={setDependantsInputVal}
                unit={"person(s)"}
            />

            <NumberResult label={"Total income"} value={income.totalIncome} unit={"VND"}/>
            <NumberResult label={"Net Income"} value={income.netIncome} unit={"VND"}/>
            <NumberResult label={"Insurance"} value={income.socialInsurance.employee.total} unit={"VND"}/>
            <NumberResult label={"Employer Total Expense"} value={income.employerTotalExpense} unit={"VND"}/>
            <NumberResult label={"Dependant Deduction"} value={income.dependantDeduction} unit={"VND"}/>
            <NumberResult label={"Tax"} value={income.tax.totalTax} unit={"VND"}/>

            <table>
                <thead>
                    <tr>
                        <th>Bracket</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0 - 5M</td>
                        <td>{income.tax.bracket.bracket1}</td>
                    </tr>
                    <tr>
                        <td>5M - 10M</td>
                        <td>{income.tax.bracket.bracket2}</td>
                    </tr>
                    <tr>
                        <td>10M - 18M</td>
                        <td>{income.tax.bracket.bracket3}</td>
                    </tr>
                    <tr>
                        <td>18M - 32M</td>
                        <td>{income.tax.bracket.bracket4}</td>
                    </tr>
                    <tr>
                        <td>32M - 52M</td>
                        <td>{income.tax.bracket.bracket5}</td>
                    </tr>
                    <tr>
                        <td>52M - 80M</td>
                        <td>{income.tax.bracket.bracket6}</td>
                    </tr>
                    <tr>
                        <td>80M+</td>
                        <td>{income.tax.bracket.bracket7}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}
