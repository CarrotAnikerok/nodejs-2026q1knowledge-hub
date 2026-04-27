export async function sendAIRequest(requestText) {
    async fetch(request, env, ctx) {
    const host = 'https://misty-sunset-6fc.anikerokyay.workers.dev'
    const apiKey = 'AIzaSyDpnrHOXldD19p-IcrhLowIPtsPzKVrpZ8'; // store this in CF secrets

    const response = await fetch(
      `${host}/v1beta/models/gemini-2.5-flash-lite:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: requestText }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data, null, 2), {
      headers: { "Content-Type": "application/json" }
    });
  }
}


