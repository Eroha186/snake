function hideMenu() {
  game.style.display = 'block';
  popup_container.style.display = 'none';
}

// создаем поле 
let field = document.createElement('div');
game.appendChild(field);
field.classList.add('field');

// делем поле на клетки
for (let i = 1; i<101; i++) {
  let excel = document.createElement('div');
  field.appendChild(excel);
  excel.classList.add('excel');
}

// присваевамем каждой клетки координаты 
let excel = document.getElementsByClassName('excel');
let x = 1,
    y = 10;

for (let i = 0; i<excel.length; i++) {
  if (x > 10) {
    x = 1;
    y--
  }
  excel[i].setAttribute('posX', x);
  excel[i].setAttribute('posY', y);
  x++;
}    

// создаем змею
let snaekeBody;

function createSnake() {
  function generateSnake () {
    let posX = Math.round(Math.random() * (10-3) + 3);
    let posY = Math.round(Math.random() * (10-1) + 1);
    return [posX, posY];
  }
  
  let coordinates = generateSnake();
  snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
                   document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'),
                   document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')
                  ];
  
  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
  }
  
  snakeBody[0].classList.add('snakeHead');
}

createSnake();

// Создаем яблоко
let apple;

function createApple () {
  function generateApple () {
    let posX = Math.round(Math.random() * (10-1) + 1);
    let posY = Math.round(Math.random() * (10-1) + 1);
    return [posX, posY];
  }

  let appleCoordinates = generateApple();
  apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY ="' + appleCoordinates[1] + '"]');
  
  while(apple.classList.contains('snakeBody')) {
    let appleCoordinates = generateApple();
    apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY ="' + appleCoordinates[1] + '"]');
  }

  apple.classList.add('apple');
}

createApple();

// вывод очков 
let input = document.createElement('input');
game.appendChild(input);

let score = 0;
input.value = `Ваши очки: ${score}`;
input.classList.add('score');


function move() {
  /*
    передвижение змеи 
    в snakeСoordinates записываются координаты первого элемента
    удаляется класс snakeHead 
    удаляется последний элемент snakeBody

  */ 
  let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
  snakeBody[0].classList.remove('snakeHead');
  snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
  snakeBody.pop();
  

  // правила ухода за границу поля и правила перемещение змейки 
  if (direction == 'right') {
    if (snakeCoordinates[0] < 10) {
      snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY ="' + snakeCoordinates[1] + '"]'));
    } else {
      snakeBody.unshift(document.querySelector('[posX = "1"][posY ="' + snakeCoordinates[1] + '"]'));
    }
  } else if (direction == 'left') {
    if (snakeCoordinates[0] > 1) {
      snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY ="' + snakeCoordinates[1] + '"]'));
    } else {
      snakeBody.unshift(document.querySelector('[posX = "10"][posY ="' + snakeCoordinates[1] + '"]'));
    }
  } else if (direction == 'up') {
    if (snakeCoordinates[1] < 10) {
      snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY ="' + (+snakeCoordinates[1] + 1) + '"]'));
    } else {
      snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY ="1"]'));
    }
  } else if (direction == 'down') {
    if (snakeCoordinates[1] > 1) {
      snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY ="' + (+snakeCoordinates[1] - 1) + '"]'));
    } else {
      snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY ="10"]'));
    }
  }
 
  // правила поедания яблока
  if (snakeBody[0].getAttribute('posX') == apple.getAttribute('posX') && snakeBody[0].getAttribute('posY') == apple.getAttribute('posY')) {
    apple.classList.remove('apple');
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
    snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
    createApple();
    score++;
    input.value = `Ваши очки: ${score}`;
  }

  // правила проигрыша 
  if (snakeBody[0].classList.contains('snakeBody')) {
    clearInterval(timer);
    snakeBody[0].style.background = '#000';
    window.location.reload();
    game.style.display = 'none';
    popup_container.style.display = 'block';
  }

  snakeBody[0].classList.add('snakeHead');
  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
  }

   step = true;
}

function inner () { //Простой
  timer = setInterval(function(){
      move();
  },250);
}
function easy () {//средний
  timer = setInterval(function(){
      move();
  },200);
}
function medium () {//сложный
  timer = setInterval(function(){
      move();
  },150);
}
function hard () {//сложный
  timer = setInterval(function(){
      move();
  },100);
}

// переменные для движения 
let direction = 'right';
let step = false;

// логика движения 
window.addEventListener('keydown', function(e) {
  if (step == true) {
    if (e.keyCode == 37 && direction != 'right') {
      direction = 'left';
      step = false;
    }
    if (e.keyCode == 38 && direction != 'down') {
      direction = 'up';
      step = false;
    }
    if (e.keyCode == 39 && direction != 'left') {
      direction = 'right';
      step = false;
    }
    if (e.keyCode == 40 && direction != 'up') {
      direction = 'down';
      step = false;
    }
  }
});



