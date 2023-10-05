document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const startButton = document.getElementById("start-button");
    const difficultyButtons = document.querySelectorAll('.difficulty input[type="button"]');

    let rows = 5;
    let columns = 6;
    let lights = 10;

    function initializeBoard() {
        board.innerHTML = ""; // Limpia el tablero antes de inicializarlo
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const button = document.createElement("button");
                button.className = "board-button";
                button.addEventListener("click", () => toggleLights(i, j));
                board.appendChild(button);
            }
        }
        updateBoard();
    }

    function toggleLights(row, column) {
        toggleLight(row, column);
        toggleLight(row - 1, column);
        toggleLight(row + 1, column);
        toggleLight(row, column - 1);
        toggleLight(row, column + 1);
    }

    function toggleLight(row, column) {
        if (row >= 0 && row < rows && column >= 0 && column < columns) {
            const button = document.getElementsByClassName("board-button")[row * columns + column];
            button.classList.toggle("on");
        }
    }

    function updateBoard() {
        const buttons = document.getElementsByClassName("board-button");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("on");
        }
        for (let i = 0; i < lights; i++) {
            const randomIndex = Math.floor(Math.random() * (rows * columns));
            buttons[randomIndex].classList.add("on");
        }
    }

    difficultyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const custom = button.getAttribute("data-custom");
            if (custom === "true") {
                const customRows = parseInt(prompt("Introduce el número de filas:"));
                const customColumns = parseInt(prompt("Introduce el número de columnas:"));
                const customLights = parseInt(prompt("Introduce el número de luces:"));
                if (!isNaN(customRows) && !isNaN(customColumns) && !isNaN(customLights) &&
                    customRows > 0 && customColumns > 0 && customLights > 0 && customLights < customRows * customColumns) {
                    rows = customRows;
                    columns = customColumns;
                    lights = customLights;
                    initializeBoard();
                } else {
                    alert("Por favor, introduce valores válidos.");
                }
            } else {
                rows = parseInt(button.getAttribute("data-rows"));
                columns = parseInt(button.getAttribute("data-columns"));
                lights = parseInt(button.getAttribute("data-lights"));
                initializeBoard();
            }
        });
    });

    startButton.addEventListener("click", function () {
        initializeBoard();
    });

    initializeBoard();
});
