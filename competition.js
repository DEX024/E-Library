// Import the necessary modules
const fetch = require('node-fetch');

// Function to create a chat session
async function createChatSession(apiKey, externalUserId) {
  const url = 'https://api.on-demand.io/chat/v1/sessions';
  const headers = {
    'Content-Type': 'application/json',
    'apikey': apiKey
  };
  const body = JSON.stringify({
    pluginIds: [],
    externalUserId: externalUserId
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  });

  const data = await response.json();
  return data.data.id; // Extract session ID
}

// Function to submit a query
async function submitQuery(apiKey, sessionId, query) {
  const url = `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`;
  const headers = {
    'Content-Type': 'application/json',
    'apikey': apiKey
  };
  const body = JSON.stringify({
    endpointId: 'predefined-openai-gpt4o',
    query: query,
    pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1726229028'],
    responseMode: 'sync'
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  });

  const data = await response.json();
  return data;
}

// Main function to execute the API calls
async function main() {
  const apiKey = '<replace_api_key>';
  const externalUserId = '<replace_external_user_id>';
  const query = 'Put your query here';

  try {
    const sessionId = await createChatSession(apiKey, externalUserId);
    const response = await submitQuery(apiKey, sessionId, query);
    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute the main function
main();
