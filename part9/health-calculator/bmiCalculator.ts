import { isNotNumber } from "./utils";

interface HeightAndWeight {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): HeightAndWeight => {
  if (args.length < 4) throw new Error("Please provide both height and weight");
  if (args.length > 4) throw new Error("Please provide only height and weight");

  if (isNotNumber(args)) {
    throw new Error("Provided values are not number");
  } else {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = Number((weight / Math.pow(height / 100, 2)).toFixed(1));

  switch (true) {
    case bmi < 16:
      return "Underweight (Severe thinness)";
    case bmi >= 16 && bmi <= 16.9:
      return "Underweight (Moderate thinness)";
    case bmi >= 17 && bmi <= 18.4:
      return "Underweight (Mild thinness)";
    case bmi >= 18.5 && bmi <= 24.9:
      return "Normal (healthy weight)";
    case bmi >= 25 && bmi <= 29.9:
      return "Overweight (Pre-obese)";
    case bmi >= 30 && bmi <= 34.9:
      return "Obese (Class I)";
    case bmi >= 35 && bmi <= 39.9:
      return "Obese (Class II)";
    case bmi > 40:
      return "Obese (Class III)";
    default:
      return "";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  let errorMessage = "Something bad happened. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}
