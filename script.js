// Отримуємо посилання на елементи поля, м'яча та воріт за їхніми ідентифікаторами
const field = document.getElementById('field');
const ball = document.getElementById('ball');
const goal1 = document.getElementById('goal1');
const goal2 = document.getElementById('goal2');

// Швидкість руху м'яча по горизонталі та вертикалі
let ballSpeedX = 2;
let ballSpeedY = 1;

// Позиція м'яча
let ballPosition = { x: ball.offsetLeft, y: ball.offsetTop };

// Оновлення позиції м'яча
function updateBallPosition() {
    ballPosition.x += ballSpeedX;
    ballPosition.y += ballSpeedY;
}

// Початок анімації руху м'яча
function moveBall() {
    // Оновлення позиції м'яча перед перевіркою колізій
    updateBallPosition();

    // Перевірка колізій з полям
    if (ballPosition.x <= 0 || ballPosition.x >= field.offsetWidth - ball.offsetWidth) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballPosition.y <= 0 || ballPosition.y >= field.offsetHeight - ball.offsetHeight) {
        ballSpeedY = -ballSpeedY;
    }

    // Перевірка, чи м'яч перетнув ворота
    if (ballPosition.x <= goal1.offsetWidth && ballPosition.y >= goal1.offsetTop && ballPosition.y <= goal1.offsetTop + goal1.offsetHeight) {
        // Якщо так, виводимо повідомлення про забитий гол та скидаємо м'яч
        alert("Гол забито!");
        resetBall();
        return; // Зупиняємо анімацію
    }
    if (ballPosition.x >= field.offsetWidth - goal2.offsetWidth - ball.offsetWidth && ballPosition.y >= goal2.offsetTop && ballPosition.y <= goal2.offsetTop + goal2.offsetHeight) {
        // Те саме для других воріт
        alert("Гол забито!");
        resetBall();
        return; // Зупиняємо анімацію
    }

    // Оновлення позиції м'яча в DOM
    ball.style.left = ballPosition.x + 'px';
    ball.style.top = ballPosition.y + 'px';

    // Запуск наступної анімації
    requestAnimationFrame(moveBall);
}

// Функція, яка починає анімацію руху м'яча
function startAnimation() {
    // Перевірка, чи анімація вже запущена
    if (!animationId) {
        animationId = requestAnimationFrame(moveBall); // Запускаємо анімацію
    }
}

// Функція, яка зупиняє анімацію руху м'яча
function stopAnimation() {
    cancelAnimationFrame(animationId); // Зупиняємо анімацію
    animationId = null; // Скидаємо ідентифікатор анімації
}

// Функція для скидання м'яча в початкове положення
function resetBall() {
    ballPosition.x = 50; // Задаємо початкову позицію м'яча
    ballPosition.y = field.offsetHeight / 2; // Задаємо початкову позицію м'яча
    ball.style.left = ballPosition.x + 'px';
    ball.style.top = ballPosition.y + 'px';
}

// Додаємо обробник події для кнопки "Старт"
document.getElementById('startButton').addEventListener('click', startAnimation);

// Додаємо обробник події для кнопки "Стоп"
document.getElementById('stopButton').addEventListener('click', stopAnimation);

let animationId; // Ідентифікатор анімації

// Початок анімації руху м'яча
startAnimation();