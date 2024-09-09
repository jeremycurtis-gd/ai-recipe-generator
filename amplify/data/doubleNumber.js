export function request(ctx) {
  const { number1, number2 } = ctx.arguments;

  // Return the tripled number directly
  return {
    payload: { answer: number1 * number2 },
  };
}

export function response(ctx) {
  const answer = ctx.result.answer;
  const error = ctx.error;

  console.log("Answer:", answer);
  console.log("Error:", error);

  // Create the response object
  const response = {
    result: answer,
    error: error,
  };

  // Return the response
  return response;
}