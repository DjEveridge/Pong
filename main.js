const canvas = document.getElementById("canvas");

const c = canvas.getContext("2d");

const startButtonImage = document.getElementById("start-button-image");

const playButtonImage = document.getElementById("play-button-image");

const restartButtonImage = document.getElementById("restart-button-image");

const BEEP = new Audio("./pong images/BEEP.ogg");

const HITRIGHTANDLEFT = new Audio("./pong images/HIT RIGHT OR LEFT.ogg");

const HITTOPANDBOTTOM = new Audio("./pong images/HIT TOP AND BOTTOM.ogg");

const player1PaddleColor = window.prompt("Player 1: Choose Your Paddle Color ");

const player2PaddleColor = window.prompt("Player 2: Choose Your Paddle Color");

const ballColor = window.prompt("Choose The Ball Color");

let ballSpeed = window.prompt("Choose The Ball's Speed \n (a) Slow \n (a) Medium \n(a) Fast \n (d) Insane");

if(ballSpeed ==='a') {

    ballSpeed = 1;

} else if(ballSpeed === 'b') {

    ballSpeed = 3;

} else if(ballSpeed === 'c') {

    ballSpeed = 5;

}else if(ballSpeed === 'd') {

    ballSpeed = 10;

}

canvas.width = innerWidth;

canvas.height = innerHeight;

canvas.style.backgroundColor = 'black';

let player1Score = 0;


let player2Score = 0;

let ballDX = ballSpeed;

let ballDY = ballSpeed;

let dx = 5;

let dy = 5;

let ballDXBase = ballSpeed;

let ballDYBase = ballSpeed;

let start = false;

let pause = false;
let player1ControlsKeyDown = 
{
    up: false,
    down: false
};

let player1ControlsKeyUp = 
{
    up: false,
    down: false
};

let player2ControlsKeyDown = 
{
    up: false,
    down: false
};

let player2ControlsKeyUp = 
{
    up: false,
    down: false
};

class Paddle {
    constructor(X, Y, height, width, color) {
        this.X = X;
        this.Y = Y;
        this.height = height;
        this.width = width;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.fillRect(this.X, this.Y, this.width, this.height);
        c.fill();
        c.closePath();
    }
}




class Ball {
    constructor(X, Y, width, height, color) {
        this.X = X;
        this.Y = Y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.fillRect(this.X, this.Y, this.width, this.height);
        c.fill();
        c.closePath();
    }
}



class Button {
    constructor(X, Y, width, height) {
        this.X = X;
        this.Y = Y;
        this.width = width;
        this.height = height;
    }
    draw() {
        c.beginPath();
        c.drawImage(startButtonImage, this.X, this.Y, this.width, this.height);
        c.closePath();
    }

    drawPlayButton() {
        c.beginPath();
        c.drawImage(playButtonImage, this.X, this.Y, this.width, this.height);
        c.closePath();
    }

    drawRestartButton() {
        c.beginPath();
        c.drawImage(restartButtonImage, this.X, this.Y, this.width, this.height);
        c.closePath();
    }
}


// Creation Of Game Objects

const leftPaddle = new Paddle(100, 200, 150, 20, player1PaddleColor);

const myBall = new Ball(500, 250, 10, 10, ballColor);

const rightPaddle = new Paddle(canvas.width - 100, 200, 150, 20, player2PaddleColor);

const startButton = new Button((canvas.width/2) - 200, 200, 400, 100)

const playButton = new Button(canvas.width/2 - 150, canvas.height/2 - 200, 300, 75);

const restartButton = new Button(canvas.width/2, canvas.height/2, 200, 50);
// Movement For Both Players

// Movement For Player 1

function player1Controls(Event) {
    if(Event.key === 'q') {
        player1ControlsKeyDown.up = true;
        player1ControlsKeyUp.up = false;
    } else if(Event.key === 'a') {
        player1ControlsKeyDown.down = true;
        player1ControlsKeyUp.down = false;
    }
}


function player1ControlsUp(Event) {
    if(Event.key === 'q') {
        player1ControlsKeyDown.up = false;
        player1ControlsKeyUp.up = true;
    } else if(Event.key === 'a') {
        player1ControlsKeyDown.down = false;
        player1ControlsKeyUp.down = true;
    }
}


function movePlayer1() {
    if(player1ControlsKeyDown.up === true) {
        leftPaddle.Y -= dy;
    } else if(player1ControlsKeyDown.down === true) {
        leftPaddle.Y += dy;
    }
}



// Movement For Player 2

function player2Controls(Event) {
    if(Event.key === 'ArrowUp') {
        player2ControlsKeyDown.up = true;
        player2ControlsKeyUp.up = false;
    } else if(Event.key === 'ArrowDown') {
        player2ControlsKeyDown.down = true;
        player2ControlsKeyUp.down = false;
    }
}


function player2ControlsUp(Event) {
    if(Event.key === 'ArrowUp') {
        player2ControlsKeyDown.up = false;
        player2ControlsKeyUp.up = true;
    } else if(Event.key === 'ArrowDown') {
        player2ControlsKeyDown.down = false;
        player2ControlsKeyUp.down = true;
    }
}


function movePlayer2() {
    if(player2ControlsKeyDown.up === true) {
        rightPaddle.Y -= dy;
    } else if(player2ControlsKeyDown.down === true) {
        rightPaddle.Y += dy;
    }
}


addEventListener('keydown', player2Controls);
addEventListener('keyup', player2ControlsUp);



addEventListener('keydown', player1Controls);
addEventListener('keyup', player1ControlsUp);

// End of Movement



// All Collision Detection


// Paddles to walls collision detection

function paddleToWallsCollisionDetection(a) {
    if(a.Y < 0) {
        a.Y += dy;
    } else if(a.Y + a.height > canvas.height) {
        a.Y -= dy;
    }
}


// Ball to paddles collision detection

function ballToLeftPaddleCollisionDetection() {
    if(myBall.X < leftPaddle.X + leftPaddle.width && myBall.X + myBall.width > leftPaddle.X && myBall.Y < leftPaddle.Y + leftPaddle.height && myBall.Y + myBall.height > leftPaddle.Y) {
        ballDX = -ballDXBase;
        ballDY = ballDYBase;
        ballDX = -ballDX * (1+(Math.random()*0.3)-0.05)
        ballDY = -ballDY * (1+(Math.random()*0.3)-0.05)    
        BEEP.play();
    }
}


function ballToRightPaddleCollisionDetection() {
    if(myBall.X <rightPaddle.X +rightPaddle.width && myBall.X + myBall.width >rightPaddle.X && myBall.Y <rightPaddle.Y +rightPaddle.height && myBall.Y + myBall.height >rightPaddle.Y) {
        ballDX = ballDXBase;
        ballDY = ballDYBase;
        ballDX = -ballDX * (1+(Math.random()*0.3)-0.05)
        ballDY = -ballDY * (1+(Math.random()*0.3)-0.05)    
        BEEP.play();
    }
}

// Ball To Borders Collision Detection

function ballToBordersCollisionDetection() {
    if(myBall.X <= 0) {
        ballDX = -ballDX;
        player2Score ++;
        myBall.X = (canvas.width/2) - (myBall.width/2)
        myBall.Y = (canvas.height/2) - 100
        HITRIGHTANDLEFT.play();

    } else if(myBall.X + myBall.width >= canvas.width) {
        ballDX = -ballDX
        player1Score ++
        myBall.X = (canvas.width/2) - (myBall.width/2)
        myBall.Y = (canvas.height/2) - 200
        HITRIGHTANDLEFT.play();
    } else if(myBall.Y < 0) {
        ballDY = -ballDY;
        HITTOPANDBOTTOM.play();
    } else if(myBall.Y + myBall.height > canvas.height) {
        ballDY = -ballDY;
        HITTOPANDBOTTOM.play();
    }
}



// Click Start Button Collision Detection

function startButtonCollisionDetection(Event) {
    if(Event.clientX < startButton.X + startButton.width && Event.clientX > startButton.X && Event.clientY > startButton.Y && Event.clientY < startButton.Y + startButton.height) {
        start = true;
    }
}

// Click Play Button Collision Detection

function playButtonCollisionDetection(Event) {
    if(Event.clientX < playButton.X + playButton.width && Event.clientX > playButton.X && Event.clientY > playButton.Y && Event.clientY < playButton.Y + playButton.height) {
        pause = false;
    }
}

// Click Restart Button Collision Detection

function restartButtonCollisionDetection(Event) {
    if(Event.clientX < restartButton.X + restartButton.width && Event.clientX > restartButton.X && Event.clientY > restartButton.Y && Event.clientY < restartButton.Y + restartButton.height) {
        document.location.reload();
    }
}

// End Of Collision Detection

function pointerWhenHoveringOverStartButton() {
    if(Event.clientX < startButton.X + startButton.width && Event.clientX > startButton.X && Event.clientY > startButton.Y && Event.clientY < startButton.Y + startButton.height) {
        console.log('test')
    }
}

function drawScore() {
    c.font = '30px Georgia';
    c.fillStyle = 'white';
    c.fillText(`${player1Score} | ${player2Score}`, canvas.width/2 - 50, 20);
}

function resizeCanvas() {

    canvas.width = innerWidth;
    canvas.height = innerHeight;

}




// Event Handlers
addEventListener('resize', resizeCanvas)
addEventListener('mousedown', startButtonCollisionDetection);
addEventListener('mousemove', pointerWhenHoveringOverStartButton);
addEventListener('mousedown', playButtonCollisionDetection)
addEventListener('mousedown', restartButtonCollisionDetection);
addEventListener('keydown', (Event) => {
    if(Event.key ==='Escape') {
        pause = !pause;
        console.log(pause)
    }
})
function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)
    leftPaddle.draw();
    rightPaddle.draw();
    myBall.draw();
    drawScore();
    if(start === false) {
        startButton.draw();
    } else {
        if(pause === false) {
           ballToLeftPaddleCollisionDetection();
           ballToRightPaddleCollisionDetection();
           ballToBordersCollisionDetection();
            myBall.X += ballDX;
            myBall.Y += ballDY;
            movePlayer1();
            movePlayer2();
            paddleToWallsCollisionDetection(leftPaddle);
            paddleToWallsCollisionDetection(rightPaddle);
        } else if(pause === true) {
            playButton.drawPlayButton();
            restartButton.drawRestartButton();
        }
    }
    
    window.requestAnimationFrame(animate);
}

animate()
