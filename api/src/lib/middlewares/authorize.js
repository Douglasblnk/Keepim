const handler = async (event, context) => {
  if (context.prev === undefined) {
    // Previous middleware handler didn't return. End execution.
    context.end();
    return {
      statusCode: 200,
      body: 'No results',
    };
  }
};
