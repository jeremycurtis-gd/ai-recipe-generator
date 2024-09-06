export function request(ctx) {
  const { number } = ctx.args;

  // Return the doubled number as a JSON object
  return {
    payload: JSON.stringify({ number: number * 2 }),
  };
}


export function response(ctx) {
  // Parse the response body
  
  const parsedResult = JSON.parse(ctx.result);
  const error = ctx.error

  console.log("Hello ********************************************************")
  console.log("**************************************************************")
  console.log(ctx)
  console.log ("parsed Result" + parsedResult)
  
  // Access the number from the parsed result
  const number = parsedResult.number;
  console.log ("Number: " + number)
  console.log ("Error: " + error)
  
  // Extract the result from the response
  const res = {
    result: number,
    error: error
  };
  
  // Return the response
  return res;
}