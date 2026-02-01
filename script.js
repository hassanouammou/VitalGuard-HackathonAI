// --- Graphique hebdo (reste inchangé, pas de mise à jour des autres valeurs) ---
const bpmHistory = [70,72,75,71,74,73,72];
const fallsHistory = [0,1,0,2,0,0,1]; // reste constant
const ctxWeekly = document.getElementById('weeklyChart').getContext('2d');
const weeklyChart = new Chart(ctxWeekly, {
  type:'line',
  data:{
    labels:['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
    datasets:[
      { label:'BPM', data:bpmHistory, borderColor:'#10B981', backgroundColor:'rgba(16,185,129,0.2)', tension:0.4, fill:true, pointRadius:6, pointHoverRadius:8, borderWidth:3 },
      { label:'Chutes détectées', data:fallsHistory, borderColor:'#FBBF24', backgroundColor:'rgba(251,191,36,0.2)', tension:0.4, fill:true, pointRadius:6, pointHoverRadius:8, borderWidth:3 }
    ]
  },
  options:{ responsive:true, plugins:{ legend:{ position:'top', labels:{boxWidth:20, padding:15} } }, scales:{ y:{ beginAtZero:true } } }
});

// --- Carte ---
const facSciLat = 30.4228, facSciLng = -9.5987;
const map = L.map('map').setView([facSciLat, facSciLng],16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19 }).addTo(map);
L.marker([facSciLat, facSciLng]).addTo(map).bindPopup("Faculté des Sciences Agadir").openPopup();

// --- Chatbot ---
const vitalBtn = document.getElementById('vital-btn');
const chatbot = document.getElementById('chatbot');
const messagesDiv = document.getElementById('chatbot-messages');
const userInput = document.getElementById('userMessage');

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  const textDiv = document.createElement('div');
  textDiv.classList.add('text');
  textDiv.textContent = text;
  msgDiv.appendChild(textDiv);
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function toggleChat() {
  chatbot.style.display = chatbot.style.display==='flex'?'none':'flex';
  if(chatbot.style.display==='flex' && messagesDiv.innerHTML==='') addMessage("Bonjour ! Je suis Vital, votre assistant AI.", 'ai');
}

vitalBtn.addEventListener('click', toggleChat);
document.getElementById('chatbot-header').addEventListener('click', toggleChat);

userInput.addEventListener('keydown', e => {
  if(e.key==='Enter'){
    const text = userInput.value.trim(); if(!text) return;
    addMessage(text, 'user'); userInput.value = '';
    setTimeout(() => {
      let response = "Je peux fournir les informations suivantes : BPM, chutes, température et bracelets.";
      const t = text.toLowerCase();
      if(t.includes("bpm")) response = `BPM actuel: ${document.getElementById('bpmVal').textContent}. Historique: ${bpmHistory.join(', ')}`;
      if(t.includes("chute")) response = `Chutes aujourd'hui: ${document.getElementById('fallsVal').textContent}. Historique: ${fallsHistory.join(', ')}`;
      if(t.includes("température")) response = `Température: ${document.getElementById('tempVal').textContent} °C.`;
      if(t.includes("bracelet")) response = `Bracelets connectés: ${document.getElementById('braceletsVal').textContent}.`;
      addMessage(response, 'ai');
    }, 700);
  }
});

function updateBPM() {
  const allowedBPM = [32, 34, 70, 68, 45];
  // choisir une valeur aléatoire parmi le tableau
  const newBPM = allowedBPM[Math.floor(Math.random() * allowedBPM.length)];
  document.getElementById('bpmVal').textContent = newBPM;
}

setInterval(updateBPM, 2000);