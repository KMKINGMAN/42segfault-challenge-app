// CyberSafe Challenge - Enhanced with cybersecurity theme

// Morse code mapping
const MORSE_MAP = {
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.'
};

// Reverse mapping for decoding (for display purposes)
const REVERSE_MORSE_MAP = {};
Object.keys(MORSE_MAP).forEach(key => {
  REVERSE_MORSE_MAP[MORSE_MAP[key]] = key;
});

// Variable to store the current correct code
let CORRECT_CODE = '';
let morseCode = '';
let level = 1;
let attemptCount = 0;
let maxAttempts = 3;

// Generate a random 4-digit code
function generateRandomCode() {
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
}

// Convert a digit code to Morse code
function codeToMorse(code) {
  return code.split('').map(digit => MORSE_MAP[digit]).join('  ');
}

// Reset animations
function resetAnimations() {
  const messageEl = document.getElementById('message');
  const container = document.querySelector('.safe-container');
  if (messageEl && container) {
    messageEl.classList.remove('animate');
    container.classList.remove('shake');
    // force reflow
    void messageEl.offsetWidth;
    void container.offsetWidth;
  }
}

// Add terminal typing effect
function typeText(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  
  typing();
}

// Function for matrix rain effect on success
function createMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '1000';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const characters = "01010101010101010101";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  
  // Array to store the position of each character
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    // Create semi-transparent black background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text color and font
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';
    
    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      // Random character
      const text = characters[Math.floor(Math.random() * characters.length)];
      
      // x = position on the x-axis
      // y = position on the y-axis (drops[i] * fontSize)
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      // Restart the drop if it's at the bottom or randomly
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      // Move the drop down
      drops[i]++;
    }
  }

  // Start animation
  const matrixInterval = setInterval(draw, 33);
  
  // Clear after 5 seconds
  setTimeout(() => {
    clearInterval(matrixInterval);
    document.body.removeChild(canvas);
  }, 5000);
}

// Function to simulate decryption process
function simulateDecryption(callback) {
  const decryptionEl = document.createElement('div');
  decryptionEl.className = 'fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50';
  decryptionEl.innerHTML = `
    <div class="text-cyan-400 text-xl mb-4">DECRYPTION IN PROGRESS</div>
    <div class="cyber-container p-6 w-3/4 max-w-md">
      <div class="progress-bar h-3 bg-black mb-4 relative overflow-hidden">
        <div class="progress-fill absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-cyan-400" style="width: 0%"></div>
      </div>
      <div class="text-sm text-cyan-300" id="decryptionStatus">Initializing decryption sequence...</div>
      <div class="text-xs text-gray-500 mt-2" id="decryptionDetails">Analyzing morse patterns...</div>
    </div>
  `;
  
  document.body.appendChild(decryptionEl);
  
  const progressFill = decryptionEl.querySelector('.progress-fill');
  const statusEl = document.getElementById('decryptionStatus');
  const detailsEl = document.getElementById('decryptionDetails');
  
  const statusMessages = [
    "Initializing decryption sequence...",
    "Analyzing morse patterns...",
    "Matching with known cipher database...",
    "Decoding symbols...",
    "Verifying integrity...",
    "Generating access token...",
    "Access granted!"
  ];
  
  const detailMessages = [
    "Running SHA-256 algorithm",
    "Decrypting using AES-128",
    "Checking firewall permissions",
    "Bypassing security measures",
    "Validating access token",
    "Connecting to secure server"
  ];
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      setTimeout(() => {
        document.body.removeChild(decryptionEl);
        callback();
      }, 500);
    }
    
    progressFill.style.width = progress + '%';
    
    // Update status message
    const statusIndex = Math.min(Math.floor(progress / (100 / statusMessages.length)), statusMessages.length - 1);
    statusEl.textContent = statusMessages[statusIndex];
    
    // Random detail message
    if (Math.random() > 0.7) {
      detailsEl.textContent = detailMessages[Math.floor(Math.random() * detailMessages.length)];
    }
  }, 150);
}

// Function to generate a new code and update the UI
function generateNewChallenge() {
  CORRECT_CODE = generateRandomCode();
  morseCode = codeToMorse(CORRECT_CODE);
  
  // Update the UI with the new Morse code
  const morseWall = document.querySelector('.morse-wall');
  if (morseWall) {
    // Add a typing effect to the morse code
    morseWall.textContent = ''; // Clear first
    let index = 0;
    const morseArray = morseCode.split('');
    
    function typeMorse() {
      if (index < morseArray.length) {
        morseWall.textContent += morseArray[index];
        index++;
        setTimeout(typeMorse, 30);
      }
    }
    
    typeMorse();
    
    console.log('New code generated:', CORRECT_CODE); // For debugging
  }
  
  // Clear input field
  const codeInput = document.getElementById('codeInput');
  if (codeInput) {
    codeInput.value = '';
  }
  
  // Reset message
  const messageEl = document.getElementById('message');
  if (messageEl) {
    messageEl.textContent = '';
  }
  
  // Reset attempt counter
  attemptCount = 0;
}

// Check the user's input code
function checkCode() {
  const codeInput = document.getElementById('codeInput');
  const messageEl = document.getElementById('message');
  const container = document.querySelector('.safe-container');
  const correctSound = document.getElementById('correctSound');
  const wrongSound = document.getElementById('wrongSound');
  
  if (!codeInput) return;
  
  const userCode = codeInput.value.trim();
  resetAnimations();
  
  // Increment attempt counter
  attemptCount++;
  
  if (userCode === CORRECT_CODE) {
    if (correctSound) {
      correctSound.currentTime = 0;
      correctSound.play();
    }
    
    simulateDecryption(() => {
      if (messageEl) {
        messageEl.textContent = '✅ ACCESS GRANTED';
        messageEl.style.color = '#00ff00';
        messageEl.classList.add('animate');
      }
      
      // Show matrix effect on successful access
      createMatrixRain();
      
      // Update level for next challenge
      level++;
      
      setTimeout(showCelebration, 1000);
    });
  } else {
    if (wrongSound) {
      wrongSound.currentTime = 0;
      wrongSound.play();
    }
    
    if (messageEl) {
      if (attemptCount >= maxAttempts) {
        messageEl.textContent = '⚠️ TOO MANY FAILED ATTEMPTS. SYSTEM LOCKED.';
        messageEl.style.color = '#ff0000';
        messageEl.classList.add('animate');
        
        // Disable input for 5 seconds
        if (codeInput) {
          codeInput.disabled = true;
          setTimeout(() => {
            codeInput.disabled = false;
            generateNewChallenge(); // Generate new code after lockout
          }, 5000);
        }
      } else {
        messageEl.textContent = `❌ INCORRECT CODE. ATTEMPTS: ${attemptCount}/${maxAttempts}`;
        messageEl.style.color = '#ff6b6b';
        messageEl.classList.add('animate');
      }
    }
    
    if (container) {
      container.classList.add('shake');
    }
  }
}

// Create a stylized cyberpunk popup
function showCelebration() {
  const popup = document.createElement('div');
  popup.className = 'fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-y-auto';
  popup.innerHTML = `
    <div class="cyber-container p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-sm md:max-w-md mx-auto relative">
      <div class="absolute -top-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full"></div>
      <div class="absolute -top-2 -left-2 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full"></div>
      <div class="absolute -bottom-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full"></div>
      <div class="absolute -bottom-2 -left-2 w-3 h-3 md:w-4 md:h-4 bg-yellow-500 rounded-full"></div>
      
      <h2 class="cyber-title text-lg sm:text-xl md:text-2xl font-bold text-center mb-3 md:mb-4 glitch">ACCESS GRANTED</h2>
      <div class="cyber-container p-2 sm:p-3 md:p-4 bg-black bg-opacity-70 mb-4 md:mb-6">
        <div class="text-green-400 text-xs sm:text-sm font-mono">
          <div>> System breach successful</div>
          <div>> Security level ${level-1} bypassed</div>
          <div>> Cybersecurity test status: PASSED</div>
          <div>> Next security level: ${level}</div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <button id="nextChallenge" class="cyber-btn w-full sm:flex-1 py-2 px-3 rounded text-white text-xs sm:text-sm">NEXT CHALLENGE</button>
        <button id="closePopup" class="bg-gray-800 w-full sm:flex-1 py-2 px-3 rounded text-gray-300 border border-gray-600 text-xs sm:text-sm">EXIT SYSTEM</button>
      </div>
      <canvas id="confetti" class="absolute inset-0 pointer-events-none"></canvas>
    </div>
  `;
  
  document.body.appendChild(popup);

  // Handle popup scrolling
  document.body.style.overflow = 'hidden';
  
  // Add event listeners for buttons
  const closePopup = document.getElementById('closePopup');
  if (closePopup) {
    closePopup.addEventListener('click', () => {
      popup.remove();
      document.body.style.overflow = 'auto'; // Restore scrolling
    });
  }

  const nextChallenge = document.getElementById('nextChallenge');
  if (nextChallenge) {
    nextChallenge.addEventListener('click', () => {
      popup.remove();
      document.body.style.overflow = 'auto'; // Restore scrolling
      generateNewChallenge(); // Generate a new code when user clicks "Next Challenge"
    });
  }

  // Close popup if user clicks outside the container
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.remove();
      document.body.style.overflow = 'auto';
    }
  });
  
  // Handle escape key press
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      popup.remove();
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscape);
    }
  };
  
  window.addEventListener('keydown', handleEscape);

  // Launch confetti after popup is shown
  launchConfetti();
}

// Improved confetti animation with cyberpunk colors
function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Cyberpunk colors
  const colors = [
    '#f72585', '#b5179e', '#7209b7', '#560bad', '#480ca8', 
    '#3a0ca3', '#3f37c9', '#4361ee', '#4895ef', '#4cc9f0'
  ];
  
  // Create confetti particles
  const confetti = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 40 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 5,
    shape: Math.random() > 0.5 ? 'circle' : 'rect'
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.fillStyle = c.color;
      
      if (c.shape === 'circle') {
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      } else {
        ctx.rect(c.x, c.y, c.r * 2, c.r * 2);
      }
      
      ctx.fill();
    });
    move();
  }

  function move() {
    confetti.forEach(c => {
      c.y += Math.cos(c.d) + 2 + c.r / 2;
      c.x += Math.sin(c.d);
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  (function animate() {
    draw();
    requestAnimationFrame(animate);
  })();
}

// Add keypress sound to input
function addKeypressSounds() {
  const inputElement = document.getElementById('codeInput');
  const keystrokeSound = document.getElementById('keystrokeSound');
  
  if (inputElement && keystrokeSound) {
    inputElement.addEventListener('keydown', () => {
      keystrokeSound.currentTime = 0;
      keystrokeSound.volume = 0.2;
      keystrokeSound.play();
    });
  }
}

// Initialize when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Cybersecurity challenge initialized');
  
  // Get DOM elements
  const unlockBtn = document.getElementById('unlockButton');
  const codeInput = document.getElementById('codeInput');
  
  // Generate initial challenge
  generateNewChallenge();
  
  // Add keypress sounds
  addKeypressSounds();
  
  // Add event listeners
  if (unlockBtn) {
    unlockBtn.addEventListener('click', checkCode);
  }
  
  if (codeInput) {
    codeInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        checkCode();
      }
    });
  }
});

