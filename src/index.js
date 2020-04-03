// let score;
let paddle;
let ammo;
let bubble;
let bubbles;
let playing;
let button;
let audio;

function setup() {
    createCanvas(700, 600);
    button = createButton('Restart Game');
    button.position(23, height + 50);
    button.mousePressed(restartGame);
    // audio = randomSong();
    // audio = createAudio("assets/heyya.mp3");
    // audio.autoplay(true);

    gameState = 'playing';
    paddle = new Paddle();
    ammo = new Ammunition(paddle);
    bubbles = createBubbles();
    resetScore();
}

// function mouseClicked () {
//     audio.play()
// }

function createBubbles() {
    const bubbles = [];
    const rows = 4;
    const bubbleRow = 12;
    const bubbleWidth = width / bubbleRow;
    let bubbleColors = [color(59, 87, 245), color(78, 56, 235), color(227, 54, 144),
    color(54, 227, 63), color(217, 106, 33), color(25, 194, 169), color(245, 66, 164),
    color(233, 242, 63), color(33, 173, 237), color(22, 145, 34), color(61, 21, 140)]
    for (let row = 0; row < rows; row++) {
        for (let i = 0; i < bubbleRow; i++) {
            bubble = new Bubble(createVector(
                bubbleWidth * i, 50 * row),
                bubbleWidth,
                50,
                bubbleColors[Math.floor(random(0, bubbleColors.length - 1))]
            );
            bubbles.push(bubble);
        }
    }
    return bubbles;
}

function draw() {
    if (gameState === 'playing') {
        background(0);
        
        ammo.collisionEdge();
        ammo.collisionPaddle();
        ammo.update();

        if (keyIsDown(LEFT_ARROW)) {
            paddle.move('left');
        } else if (keyIsDown(RIGHT_ARROW)) {
            paddle.move('right');
        }
        
        for (let i = bubbles.length - 1; i >= 0; i--) {
            bubble = bubbles[i];
            if (bubble.hit(ammo)) {
                ammo.reverse('y');
                score+= bubble.points;
                bubbles.splice(i, 1);
            } else {
                bubble.display()
            }
        }
        
        paddle.display();
        ammo.display();

        fill(255);
        textSize(32);
        text(`Score: ${score}`, width - 150, height - 30);

        if (ammo.belowPaddle()) {
            gameState = 'lose';
        }

        if (bubbles.length === 0) {
            gameState = 'win';
        }

    } else if (gameState === 'lose'){
        textFont("Impact", 118)
        fill(255, 0, 0);
        playing = false;
        text('Game Over!', width / 2 - 280, height / 2);
    } else {
        textFont("Impact", 118)
        fill(93, 215, 252);
        text('You Won!', width / 2 - 220, height / 2);
    }
}

function restartGame() {
    setup();
    createBubbles();
    draw();
}

function resetScore() {
    score = 0;
}

// function randomSong() {
//     songs = [
//       createAudio("./assets/heyya.mp3"),
//       createAudio("./assets/it_takes_two.mp3"),
//       createAudio("./assets/mr.brightside.mp3"),
//       createAudio("./assets/prince.mp3"),
//       createAudio("./assets/push_it.mp3"),
//       createAudio("./assets/sixflags.m4a"),
//       createAudio("./assets/slickrick.mp3"),
//       createAudio("./assets/work_it.mp3")
//     ];
//     return songs[Math.floor(random(0, songs.length - 1))];
// }