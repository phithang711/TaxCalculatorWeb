import {Decimal} from "decimal.js";

interface CalculatePitPayload {
  grossIncome: Decimal
  salary: Decimal
}

export default CalculatePitPayload;
