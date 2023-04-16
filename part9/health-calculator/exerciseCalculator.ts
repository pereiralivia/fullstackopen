import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface DailyExerciseHoursAndTarget {
  exerciseHours: number[];
  target: number;
}

const parseArguments = (args: string[]): DailyExerciseHoursAndTarget => {
  if (args.length < 4)
    throw new Error("Please provide daily exercise hours and target hours");
  if (args.length > 12)
    throw new Error("Please provide only exercise hours and target hours");

  if (isNotNumber(args)) {
    throw new Error("Provided values are not number");
  } else {
    return {
      exerciseHours: args.slice(3).map((s) => Number(s)),
      target: Number(args[2]),
    };
  }
};

export const calculateExercises = (
  dailyExeciseHours: number[],
  target: number
): Result => {
  const periodLength = dailyExeciseHours.length;
  const trainingDays = dailyExeciseHours.filter((d) => d > 0).length;
  const totalExerciseHours = dailyExeciseHours.reduce((acc, curr) => {
    return (acc += curr);
  }, 0);
  const average = totalExerciseHours / periodLength;
  const success = average >= target;

  const ratingMessages = {
    0: "no feedback",
    1: "okay, we all have bad days. try harder next time.",
    2: "not too bad but could be better",
    3: "good job!",
  };

  const getRating = () => {
    const roundedAverage = Math.round(average);
    switch (true) {
      case roundedAverage < target:
        return 1;
      case roundedAverage === target:
        return 2;
      case roundedAverage > target:
        return 3;
      default:
        return 0;
    }
  };

  return {
    periodLength,
    trainingDays,
    success,
    rating: getRating(),
    ratingDescription: ratingMessages[getRating()],
    target,
    average,
  };
};

try {
  const { exerciseHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error) {
  let errorMessage = "Something bad happened. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
