document.addEventListener("DOMContentLoaded", function () {
    let score = 0;
    const scoreDisplay = document.querySelector(".score p");
    const ducks = document.querySelectorAll("input[type='checkbox']");
    const gunshotSound = document.getElementById("gunshotSound");

    function updateScore() {
        scoreDisplay.textContent = "Score: " + score;
    }

    ducks.forEach(duck => {
        duck.addEventListener("change", function () {
            if (duck.checked) {
                score++;

                if (gunshotSound) {
                    gunshotSound.pause(); 
                    gunshotSound.currentTime = 0;
                    gunshotSound.play().catch(err => {
                        console.warn("Sound play failed:", err);
                    });
                }

            } else {
                score--;
            }

            updateScore();

            // Reset when all ducks are checked
            if ([...ducks].every(d => d.checked)) {
                setTimeout(() => {
                    ducks.forEach(d => d.checked = false);
                    score = 0;
                    updateScore();
                }, 500);
            }
        });
    });

    updateScore();
});
