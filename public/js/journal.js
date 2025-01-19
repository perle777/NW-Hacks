document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/prompt');
    const data = await response.json();
    document.getElementById('prompt').textContent = data.prompt;
  } catch (error) {
    console.error('Error fetching prompt:', error);
    document.getElementById('prompt').textContent = 'Failed to load prompt. Please try again later.';
  }
});

document.getElementById('journalForm').addEventListener('submit', async (event) => {
  event.preventDefault(); 
  const responseText = document.getElementById('response').value;
  const promptText = document.getElementById('prompt').textContent;

  try {
    const res = await fetch('/journal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: promptText, response: responseText })
    });

    if (res.ok) {
      document.getElementById('entrySection').style.display = 'none';
      document.getElementById('confirmationSection').style.display = 'block';
    } else {
      const errorData = await res.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error saving journal entry:', error);
    alert('Failed to save your entry. Please try again.');
  }
});