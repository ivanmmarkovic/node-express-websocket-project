
const ws = new WebSocket('ws://localhost:5000');

const messagesBox = document.getElementById('messages');
const typingNotification = document.getElementById('typing-notification');
const textBox = document.getElementById('textbox');
const btn = document.getElementById('btn');


btn.addEventListener('click', handleClick);


ws.addEventListener('message', handleMessage);


function handleMessage(data){
    console.log(data);
    let p = document.createElement('p');
    p.textContent = data.data;
    messagesBox.appendChild(p);
};

function handleClick(){
    let message = textBox.value;
    ws.send(message);
    textBox.value = '';
};
