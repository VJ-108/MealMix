const cleanJsonResponse = (response) => {
  if (response.startsWith("```json")) {
    response = response.substring("```json".length).trim();
  }
  if (response.endsWith("```")) {
    response = response.substring(0, response.length - "```".length).trim();
  }
  return response;
};

export default cleanJsonResponse;
