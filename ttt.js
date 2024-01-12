document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('reset-btn');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Function to initialize the game board
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    // Function to handle cell click
    function handleCellClick(event) {
        const clickedCell = event.target;
        const index = clickedCell.dataset.index;

        // Check if the cell is empty and the game is active
        if (boardState[index] === '' && gameActive) {
            // Update the board state and the cell content
            boardState[index] = currentPlayer;
            clickedCell.textContent = currentPlayer;

            // Check for a winner or a tie
            if (checkWinner()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else if (boardState.every(cell => cell !== '')) {
                status.textContent = 'It\'s a tie!';
                gameActive = false;
            } else {
                // Switch to the next player
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;

                // If the next player is the computer, make a random move after a short delay
                if (currentPlayer === 'O') {
                    setTimeout(makeComputerMove, 500);
                }
            }
        }
    }

    // Function to check for a winner
    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    // Function to make a random move for the computer
    function makeComputerMove() {
        const emptyCells = boardState.reduce((acc, cell, index) => {
            if (cell === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        if (emptyCells.length > 0 && gameActive) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const computerMove = emptyCells[randomIndex];
            boardState[computerMove] = currentPlayer;
            const computerCell = document.querySelector(`[data-index="${computerMove}"]`);
            computerCell.textContent = currentPlayer;

            if (checkWinner()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else if (boardState.every(cell => cell !== '')) {
                status.textContent = 'It\'s a tie!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Function to reset the game
    function resetGame() {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = 'Player X\'s turn';

        // Clear the board
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    // Event listener for the reset button
    resetBtn.addEventListener('click', resetGame);

    // Initialize the game board
    initializeBoard();
});
