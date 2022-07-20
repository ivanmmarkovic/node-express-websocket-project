
const ws = new WebSocket('ws://localhost:5000');

ws.addEventListener('message', handleMessage);


function handleMessage(data){
    console.log(data);
}