document.addEventListener('DOMContentLoaded', async function () {
  // Fetch a random prompt from the server
  try {
      const response = await fetch('http://localhost:3000/prompt');
      const data = await response.json();

      // Display the prompt in the HTML
      const promptElement = document.getElementById('prompt');
      if (promptElement) {
          promptElement.innerText = data.prompt;
      }
  } catch (error) {
      console.error('Error fetching prompt:', error);
  }

  // Add event listener for the journal form submission
  document.getElementById('journalForm').addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior

      const userInput = document.getElementById('userInput').value;

      if (!userInput) {
          alert("Please enter your journal entry!");
          return;
      }

      try {
          // Send a POST request to the backend
          const response = await fetch('http://localhost:3000/journal', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ entry: userInput })
          });

          const result = await response.json();

          // Display the response message or quote in the HTML
          if (response.ok) {
              document.getElementById('responseMessage').innerText = `
                  Journal added successfully! Here's an inspirational quote: 
                  "${result.inspirationalQuote}"
              `;
          } else {
              document.getElementById('responseMessage').innerText = `
                  Error: ${result.message || "Something went wrong"}
              `;
          }
      } catch (error) {
          console.error("Error submitting journal:", error);
          document.getElementById('responseMessage').innerText = "An error occurred. Please try again.";
      }
  });
});
