const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext("2d");

let score = document.querySelector('.score')
const scale = 32;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

//mobile arrows
const arrowUp = document.querySelector('.arrowUp');
const arrowDown = document.querySelector('.arrowDown');
const arrowLeft = document.querySelector('.arrowLeft');
const arrowRight = document.querySelector('.arrowRight');

//loading images
const foodImg = new Image();
foodImg.src = "img/broccoli.png";

const poisonImg = new Image();
poisonImg.src = "img/poison.png";

const poisonImg2 = new Image();
poisonImg2.src = "img/poison2.png";

//loading music 
let foodSound = new Audio();
foodSound.src = "audio/bubu.mp3";

let loseSound = new Audio();
loseSound.src = "audio/sad.mp3";

let winSound = new Audio();
winSound.src = "audio/win.mp3";

//gameplay
let gameStart = function setup() {
    snake = new Snake();
    food = new Food();
    burger = new Burger();
    pizza = new Pizza();
    
    food.pickLocation();
    burger.pickLocation();
    pizza.pickLocation();
    
    game = window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        food.draw();
        burger.draw();
        pizza.draw();
        
        snake.update();
        snake.draw();
        

        if(snake.eatFood(food)) {
            food.pickLocation();
        }
        
        if(snake.eatBurger(burger)) {
            burger.pickLocation();
        }
        
        if(snake.eatPizza(pizza)) {
            pizza.pickLocation();
        }
        
        score.innerText = `Twój wynik to: ${snake.total}`;
        snake.checkCollision();
        snake.lose();
        snake.win();
    }, snake.speed)
};

window.addEventListener('keydown', ((event) => {
    const direction = event.key.replace('Arrow','') //wyświetla w konsoli sam klawisz klikniety
    snake.changeDirection(direction);
}))

//dodanie eventListenerów na strzałki mobilne
arrowUp.addEventListener('click', (() => {
    const direction = "Up";
    snake.changeDirection(direction)
}))

arrowDown.addEventListener('click', (() => {
    const direction = "Down";
    snake.changeDirection(direction)
}))

arrowLeft.addEventListener('click', (() => {
    const direction = "Left";
    snake.changeDirection(direction)
}))

arrowRight.addEventListener('click', (() => {
    const direction = "Right";
    snake.changeDirection(direction)
}))

gameStart();