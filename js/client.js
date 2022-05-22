const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const inputMessage = document.getElementById('inputMessage');
const messageContainer = document.querySelector('.container');
var audio = new Audio('notification.mp3');

const append=(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = inputMessage.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    inputMessage.value='';
})

let username = prompt("Enter your name to join");
socket.emit('new-user-joined', username); 

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'left');
})
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left');
})
socket.on('left', name=>{
    append(`${name} left the chat`, 'left');
})




