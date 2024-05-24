const letters = document.querySelectorAll('.letters .card');
const images = document.querySelectorAll('.images .card');
const gameBoard = document.getElementById('gameBoard');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');

let startCard = null;
let connections = [];

function updateCanvasSize() {
    const gameBoardRect = gameBoard.getBoundingClientRect();
    canvas.width = gameBoardRect.width;
    canvas.height = gameBoardRect.height;
    canvas.style.width = `${gameBoardRect.width}px`;
    canvas.style.height = `${gameBoardRect.height}px`;
    canvas.style.top = `${gameBoardRect.top}px`;
    canvas.style.left = `${gameBoardRect.left}px`;
    canvas.style.zIndex = '1'; // Ensure canvas is above other elements
}

updateCanvasSize();

function handleCardClick(event) {
    const card = event.target.closest('.card');
    if (!startCard) {
        startCard = card;
        card.classList.add('selected');
    } else {
        if (card.dataset.name !== startCard.dataset.name && (card.parentNode !== startCard.parentNode)) {
            drawLine(startCard, card);
            connections.push({ start: startCard, end: card });
        }
        startCard.classList.remove('selected');
        startCard = null;
        console.log("Card clicked");
    }
}

function drawLine(startCard, endCard) {
    const rectStart = startCard.getBoundingClientRect();
    const rectEnd = endCard.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    const startX = rectStart.left + rectStart.width / 2 - canvasRect.left;
    const startY = rectStart.top + rectStart.height / 2 - canvasRect.top;
    const endX = rectEnd.left + rectEnd.width / 2 - canvasRect.left;
    const endY = rectEnd.top + rectEnd.height / 2 - canvasRect.top;

    console.log(`Drawing line from (${startX}, ${startY}) to (${endX}, ${endY})`);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}


function resetGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    connections = [];
    startCard = null;
    letters.forEach(card => card.classList.remove('selected'));
    images.forEach(card => card.classList.remove('selected'));
}

letters.forEach(card => card.addEventListener('click', handleCardClick));
images.forEach(card => card.addEventListener('click', handleCardClick));
restartButton.addEventListener('click', resetGame);

window.addEventListener('resize', () => {
    updateCanvasSize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    connections.forEach(connection => drawLine(connection.start, connection.end));
});

resetGame();




