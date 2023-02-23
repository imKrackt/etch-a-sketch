const header = document.querySelector('#header');
const button = document.querySelector('#btn');
const container = document.querySelector('#container');
let numSquares = 16;

button.addEventListener('click', () => {
  do {
    numSquares = parseInt(prompt('What should the width be? (between 1 and 100)', ''));
  } while (isNaN(numSquares) || numSquares < 1 || numSquares > 100);

  container.innerHTML = '';
  createSquares(numSquares);
});

function createSquares(numSquares) {
  container.style.gridTemplateColumns = `repeat(${numSquares}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${numSquares}, 1fr)`;

  for (let i = 0; i < numSquares * numSquares; i++) {
    let boxes = document.createElement('div');
    boxes.className = 'squares';
    container.appendChild(boxes);

    boxes.addEventListener('mouseover', () => {
      let color = boxes.dataset.color;
      if (!color) {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        color = `rgb(${red}, ${green}, ${blue})`;
        boxes.dataset.color = color;
      }
      let mouseOverCount = boxes.dataset.mouseOverCount || 0;
      mouseOverCount++;
      let [r, g, b] = color.match(/\d+/g);
      let darkerR = r - 0.1 * mouseOverCount * r;
      let darkerG = g - 0.1 * mouseOverCount * g;
      let darkerB = b - 0.1 * mouseOverCount * b;
      boxes.style.backgroundColor = `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
      boxes.dataset.mouseOverCount = mouseOverCount;
    });
  }
}

createSquares(numSquares);

function resizeContainer() {
  const containerSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;
  const squareSize = Math.floor(containerSize / numSquares);
  container.style.width = `${squareSize * numSquares}px`;
  container.style.height = `${squareSize * numSquares}px`;
}

window.addEventListener('resize', resizeContainer);

resizeContainer();
