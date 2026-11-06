/**
 * Ann Maria Sunil - Interactive AI Portfolio Assistant
 * Features predefined intelligent knowledge responses and an optional configurable endpoint.
 */

(function () {
  'use strict';

  // Inject Chatbot DOM structure if not already in HTML
  const initChatbotDOM = () => {
    if (document.querySelector('.chatbot-widget')) return;

    const widget = document.createElement('div');
    widget.className = 'chatbot-widget';
    widget.innerHTML = `
      <div class="chatbot-window" id="chatbot-window" role="dialog" aria-label="AI Portfolio Assistant">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-bot-identity">
            <div class="chat-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
                <rect x="3" y="6" width="18" height="15" rx="4"/>
                <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                <circle cx="16" cy="13" r="1.5" fill="currentColor"/>
                <line x1="9" y1="17" x2="15" y2="17"/>
              </svg>
            </div>
            <div class="chat-status-text">
              <h4>Ann's AI Assistant</h4>
              <p id="chat-mode-indicator"><span class="pulse-dot" style="display:inline-block; width:6px; height:6px; margin-right:4px;"></span> Interactive Demo Mode</p>
            </div>
          </div>
          <div class="chat-header-actions">
            <button class="chat-btn-icon" id="chat-config-btn" title="AI Endpoint Settings" aria-label="Settings">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
            <button class="chat-btn-icon" id="chat-close-btn" title="Close" aria-label="Close Chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Chat Message Log -->
        <div class="chat-messages" id="chat-messages">
          <div class="chat-bubble bot">
            Hello! 👋 I'm Ann Maria Sunil's AI portfolio assistant. I can answer questions about her education at Amal Jyothi College, technical skills, projects, and goals. How can I help you today?
          </div>
        </div>

        <!-- Suggestion Prompt Chips -->
        <div class="chat-suggested-prompts">
          <button class="prompt-chip" data-prompt="Who is Ann Maria?">Who is Ann Maria?</button>
          <button class="prompt-chip" data-prompt="What college does she attend?">Education</button>
          <button class="prompt-chip" data-prompt="What are her skills?">Skills</button>
          <button class="prompt-chip" data-prompt="Tell me about her projects">Projects</button>
          <button class="prompt-chip" data-prompt="How can I contact her?">Contact</button>
        </div>

        <!-- Input Area -->
        <form class="chat-input-area" id="chat-form">
          <input type="text" class="chat-input" id="chat-input" placeholder="Ask a question..." autocomplete="off" />
          <button type="submit" class="chat-send-btn" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>

        <!-- Optional Config Modal for Live Backend -->
        <div class="chat-config-modal" id="chat-config-modal">
          <div>
            <h4 style="margin-bottom:0.75rem; color:var(--accent-cyan);">AI Backend Settings</h4>
            <p style="font-size:0.85rem; margin-bottom:1rem; color:var(--text-muted);">
              By default, this chatbot runs offline with curated responses. To connect a live custom AI proxy or server, configure the endpoint below. Never expose private API keys in client-side repositories.
            </p>
            <div class="form-group" style="margin-bottom:1rem;">
              <label class="form-label" style="font-size:0.82rem;">Custom Endpoint URL (Optional)</label>
              <input type="url" id="custom-api-endpoint" class="form-control" placeholder="https://your-ai-proxy.com/api/chat" />
            </div>
            <div class="form-group" style="margin-bottom:1rem;">
              <label class="form-label" style="font-size:0.82rem;">Client-Session Key (Stored in Session Only)</label>
              <input type="password" id="custom-api-key" class="form-control" placeholder="Optional bearer token for proxy" />
            </div>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
            <button type="button" class="btn btn-secondary btn-sm" id="chat-config-cancel">Back</button>
            <button type="button" class="btn btn-primary btn-sm" id="chat-config-save">Save Settings</button>
          </div>
        </div>
      </div>

      <!-- Floating Trigger Button -->
      <button class="chatbot-trigger" id="chatbot-trigger" aria-label="Open AI Assistant">
        <span class="chatbot-trigger-badge">AI</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <line x1="9" y1="10" x2="9.01" y2="10"/>
          <line x1="12" y1="10" x2="12.01" y2="10"/>
          <line x1="15" y1="10" x2="15.01" y2="10"/>
        </svg>
      </button>
    `;

    document.body.appendChild(widget);
  };

  initChatbotDOM();

  // Elements
  const chatWindow = document.getElementById('chatbot-window');
  const chatTrigger = document.getElementById('chatbot-trigger');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const promptChips = document.querySelectorAll('.prompt-chip');
  const configBtn = document.getElementById('chat-config-btn');
  const configModal = document.getElementById('chat-config-modal');
  const configCancel = document.getElementById('chat-config-cancel');
  const configSave = document.getElementById('chat-config-save');
  const customEndpointInput = document.getElementById('custom-api-endpoint');
  const customKeyInput = document.getElementById('custom-api-key');
  const modeIndicator = document.getElementById('chat-mode-indicator');

  // Toggle Window
  chatTrigger.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      chatInput.focus();
    }
  });

  chatCloseBtn.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });

  // Toggle Config Modal
  configBtn.addEventListener('click', () => {
    configModal.classList.toggle('open');
  });
  configCancel.addEventListener('click', () => {
    configModal.classList.remove('open');
  });
  configSave.addEventListener('click', () => {
    const ep = customEndpointInput.value.trim();
    const key = customKeyInput.value.trim();
    if (ep) {
      sessionStorage.setItem('custom_ai_endpoint', ep);
      if (key) sessionStorage.setItem('custom_ai_key', key);
      modeIndicator.innerHTML = `<span class="pulse-dot" style="display:inline-block; width:6px; height:6px; margin-right:4px; background:#10B981;"></span> Live Proxy Connected`;
    } else {
      sessionStorage.removeItem('custom_ai_endpoint');
      sessionStorage.removeItem('custom_ai_key');
      modeIndicator.innerHTML = `<span class="pulse-dot" style="display:inline-block; width:6px; height:6px; margin-right:4px;"></span> Interactive Demo Mode`;
    }
    configModal.classList.remove('open');
    appendBotMessage('Configuration saved! I will now use your designated configuration.');
  });

  // Append user message
  const appendUserMessage = (text) => {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Append bot message (supports basic safe HTML for links)
  const appendBotMessage = (htmlText) => {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    bubble.innerHTML = htmlText;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Predefined Knowledge Engine for Ann Maria Sunil
  const getPredefinedAnswer = (query) => {
    const q = query.toLowerCase().trim();

    if (q.includes('who is') || q.includes('about') || q.includes('introduce')) {
      return `<strong>Ann Maria Sunil</strong> is a first-year Computer Science Engineering student at <strong>Amal Jyothi College of Engineering</strong>. She is deeply passionate about programming, web development, AI & ML, and designing clean digital experiences. You can learn more on her <a href="about.html" style="color:var(--accent-cyan); text-decoration:underline;">About Me page</a>.`;
    }

    if (q.includes('college') || q.includes('education') || q.includes('amal jyothi') || q.includes('study') || q.includes('degree')) {
      return `Ann Maria is pursuing her <strong>Bachelor of Technology (B.Tech) in Computer Science &amp; Engineering</strong> at <strong>Amal Jyothi College of Engineering</strong>, Kanjirappally, Kottayam, Kerala. She is currently in her first year focusing on core computing foundations.`;
    }

    if (q.includes('skill') || q.includes('language') || q.includes('python') || q.includes('c ') || q.includes('tech') || q.includes('stack')) {
      return `Her current technical stack includes:<br>
      • <strong>Languages:</strong> C, Python<br>
      • <strong>Tools &amp; Platforms:</strong> GitHub, Node.js<br>
      • <strong>Areas of Interest:</strong> Web Development, Artificial Intelligence, Machine Learning, and UI/UX Design.<br>
      Explore the full breakdown on the <a href="skills.html" style="color:var(--accent-cyan); text-decoration:underline;">Skills page</a>.`;
    }

    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('github repo')) {
      return `Ann Maria has developed projects including:
      <br>1. <strong>StudyFlow Dashboard:</strong> An engineering student productivity &amp; task planner.
      <br>2. <strong>Amal Jyothi Knowledge Bot:</strong> A Python &amp; embeddings mini-assistant.
      <br>Check out live previews and repos on the <a href="projects.html" style="color:var(--accent-cyan); text-decoration:underline;">Projects page</a>!`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('linkedin')) {
      return `You can connect with Ann Maria directly through her <a href="contact.html" style="color:var(--accent-cyan); text-decoration:underline;">Contact Page</a> or via LinkedIn and GitHub in the footer. She welcomes academic collaboration and tech discussions!`;
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return `Her complete academic resume and downloadable PDF preview are available on the dedicated <a href="resume.html" style="color:var(--accent-cyan); text-decoration:underline;">Resume Page</a>.`;
    }

    if (q.includes('goal') || q.includes('future') || q.includes('aspiration')) {
      return `Her goal is to grow into a versatile software engineer who combines solid systems programming, AI engineering, and intuitive UI/UX design to build meaningful real-world software.`;
    }

    // Default response
    return `That's an interesting question! Ann Maria is a 1st year CSE student at Amal Jyothi College of Engineering exploring C, Python, web technologies, and AI. Feel free to explore her <a href="about.html" style="color:var(--accent-cyan); text-decoration:underline;">About</a>, <a href="skills.html" style="color:var(--accent-cyan); text-decoration:underline;">Skills</a>, <a href="projects.html" style="color:var(--accent-cyan); text-decoration:underline;">Projects</a>, or drop a note on the <a href="contact.html" style="color:var(--accent-cyan); text-decoration:underline;">Contact page</a>!`;
  };

  // Handle Query
  const handleQuery = async (queryText) => {
    if (!queryText) return;
    appendUserMessage(queryText);
    chatInput.value = '';

    // Show typing state
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble bot';
    typingIndicator.id = 'bot-typing-indicator';
    typingIndicator.innerHTML = `<em>Thinking...</em>`;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const customEndpoint = sessionStorage.getItem('custom_ai_endpoint');
    const customKey = sessionStorage.getItem('custom_ai_key');

    if (customEndpoint) {
      try {
        const res = await fetch(customEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(customKey ? { 'Authorization': `Bearer ${customKey}` } : {})
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: queryText }],
            context: 'Ann Maria Sunil, first year Computer Science Engineering student at Amal Jyothi College of Engineering.'
          })
        });

        const data = await res.json();
        typingIndicator.remove();
        const reply = data.reply || data.choices?.[0]?.message?.content || data.response || 'Received response from backend.';
        appendBotMessage(reply);
        return;
      } catch (err) {
        console.warn('Custom AI endpoint failed, falling back to predefined answers:', err);
      }
    }

    // Predefined simulated typing response
    setTimeout(() => {
      typingIndicator.remove();
      const answer = getPredefinedAnswer(queryText);
      appendBotMessage(answer);
    }, 450);
  };

  // Chat Form Submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = chatInput.value.trim();
    if (val) handleQuery(val);
  });

  // Prompt Chips Click
  promptChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      handleQuery(prompt);
    });
  });

})();

