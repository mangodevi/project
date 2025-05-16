import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await response.json();
    setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    setInput('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Conversational AI Chatbot</h2>
      <div style={{ border: '1px solid #ccc', minHeight: 300, padding: 10, marginBottom: 10 }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        style={{ width: '80%' }} 
        placeholder="Ask a question..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;