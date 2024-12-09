document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const info = document.getElementById("info");
    const resetButton = document.getElementById("resetButton");
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modalMessage");
    const modalCloseButton = document.getElementById("modalCloseButton");

    let currentPlayer = "X";
    let gameState = Array(9).fill(null);
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function createBoard() {
        board.innerHTML = "";
        gameState.fill(null);
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", handleCellClick, { once: true });
            board.append(cell);
        }
        info.textContent = `Player ${currentPlayer}'s turn`;
    }

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;
        if (!gameState[index]) {
            gameState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWin()) {
                showModal(`Player ${currentPlayer} wins!`);
            } else if (gameState.every(cell => cell)) {
                showModal("It's a tie!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                info.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function showModal(message) {
        modalMessage.textContent = message;
        modal.classList.add("active");
        endGame();
    }

    function endGame() {
        Array.from(board.children).forEach(cell => {
            cell.removeEventListener("click", handleCellClick);
        });
    }

    modalCloseButton.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    resetButton.addEventListener("click", () => {
        modal.classList.remove("active");
        currentPlayer = "X";
        createBoard();
    });

    createBoard();
});
