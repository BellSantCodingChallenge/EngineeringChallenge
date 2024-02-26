import { Handler } from '@netlify/functions';

/**
 * Netlify serverless function handler.
 * @param {Object} event - Netlify function event object.
 * @param {Object} context - Netlify function context object.
 * @returns {Object} - Response object containing statusCode and body.
 */
export const handler: Handler = async ( event: any, context ) => {
  // Destructure the queryStringParameters from the event, default to 'stranger' if not provided
  const { name = 'stranger' } = event?.queryStringParameters;

  // Return a JSON response with a greeting message
  return {
    statusCode: 200,
    body: JSON.stringify( {
      message: `Hello, ${ name }!`,
    } ),
  };
};
