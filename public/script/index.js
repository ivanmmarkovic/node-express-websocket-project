
const ws = new WebSocket('ws://localhost:5000');

const messagesBox = document.getElementById('messages');
const typingNotification = document.getElementById('typing-notification');
const textBox = document.getElementById('textbox');
const btn = document.getElementById('btn');


btn.addEventListener('click', handleClick);
textBox.addEventListener('keyup', handleTyping);

ws.addEventListener('message', handleMessage);


function handleMessage(data){
    let message = data.data;

    if(message == 'You\'re connected'){
        let p = document.createElement('p');
        p.textContent = message;
        messagesBox.appendChild(p); 
        return;   
    }
    if(message == 'Someone is typing ...'){
        typingNotification.textContent = 'Someone is typing ...';
        setTimeout(() => {
            typingNotification.textContent = ''}
        , 1000);
        return;   
    }

    let p = document.createElement('p');
    p.textContent = message;
    messagesBox.appendChild(p);
};

function handleClick(){
    let message = textBox.value;
    if(message == '') return;

    ws.send(message);
    textBox.value = '';

    let p = document.createElement('p');
    p.textContent = 'You : ' + message;
    messagesBox.appendChild(p);
};

function handleTyping(){
    ws.send('Someone is typing ...');
};
