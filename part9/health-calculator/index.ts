import express from "express";
import qs from "qs";

import { isNotNumber } from "./utils";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.set("query parser", (str: string) => qs.parse(str));
app.use(express.json());

app.get("/bmi", (request, response) => {
  const { height, weight } = request.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    response.send({
      error: "malformatted parameters",
    });
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    response.json({
      height,
      weight,
      bmi,
    });
  }
});

app.post("/exercises", (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, target } = request.body;

  if (!daily_exercises || !target) {
    response
      .status(400)
      .send({
        error: "parameters missing",
      });
  } else if (
    !Array.isArray(daily_exercises) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isNotNumber(daily_exercises) ||
    isNaN(Number(target))
  ) {
    response
      .status(400)
      .send({
        error: "malformatted parameters",
      });
  } else {
    const result = calculateExercises(
      daily_exercises.map((n: number): number => Number(n)),
      Number(target)
    );
    response.status(200).send(result);
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
