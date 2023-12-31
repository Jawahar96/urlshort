async function shortenUrl() {
    const originalUrl = document.getElementById('originalUrl').value;
  
    if (!isValidUrl(originalUrl)) {
      alert('Please enter a valid URL');
      return;
    }
  
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      const shortUrlContainer = document.getElementById('shortUrlContainer');
      shortUrlContainer.innerHTML = `<p>Short URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></p>`;
    } else {
      alert(`Error: ${data.error}`);
    }
  }
  
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
  