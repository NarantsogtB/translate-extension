const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const checkBtn = document.getElementById('checkBtn');

async function checkConnection() {
  statusDot.className = 'status-dot';
  statusText.textContent = 'Connecting to backend...';
  
  try {
    const response = await fetch('http://localhost:4210/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ health }' })
    });
    
    const result = await response.json();
    if (result.data && result.data.health === 'OK') {
      statusDot.className = 'status-dot ok';
      statusText.textContent = '✓ Backend is running (Port 4210)';
    } else {
      throw new Error();
    }
  } catch (e) {
    statusDot.className = 'status-dot error';
    statusText.textContent = '✗ Cannot reach backend. Make sure "bun run dev" is active.';
  }
}

checkBtn.addEventListener('click', checkConnection);

// Auto-check on load
checkConnection();
