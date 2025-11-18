document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary elements from the DOM
    const swingButton = document.getElementById('swing-btn');
    const resetButton = document.getElementById('reset-btn');
    const playerRunsEl = document.getElementById('player-runs');
    const compRunsEl = document.getElementById('comp-runs');
    const inningEl = document.getElementById('inning');
    const outsEl = document.getElementById('outs');
    const scoreEl = document.getElementById('score');
    const messageArea = document.getElementById('message-area');

    // Initialize game state variables
    let playerRuns = 0;
    let computerRuns = 0;
    let inning = 1;
    let outs = 0;
    let isPlayerTurn = true;

    // Updates the scoreboard on the page
    const updateScoreboard = () => {
        playerRunsEl.textContent = `Runs: ${playerRuns}`;
        compRunsEl.textContent = `Runs: ${computerRuns}`;
        inningEl.textContent = inning;
        outsEl.textContent = outs;
        scoreEl.textContent = `${playerRuns} - ${computerRuns}`;
    };

    // Handles the end of a turn (after 3 outs)
    const endTurn = () => {
        outs = 0;
        isPlayerTurn = !isPlayerTurn;
        if (isPlayerTurn) {
            messageArea.textContent = 'Player\'s turn to bat! Click "Swing".';
        } else {
            messageArea.textContent = 'Computer\'s turn to bat...';
            setTimeout(computerTurn, 1500); // Wait and then take computer's turn
        }
    };

    // Handles the end of an inning (after both teams have batted)
    const endInning = () => {
        inning++;
        endTurn();
        if (inning > 9) {
            endGame();
        }
    };

    // Displays the game-over message
    const endGame = () => {
        let winner;
        if (playerRuns > computerRuns) {
            winner = 'Player';
            messageArea.textContent = `Game over! Player wins ${playerRuns} to ${computerRuns}!`;
        } else if (computerRuns > playerRuns) {
            winner = 'Computer';
            messageArea.textContent = `Game over! Computer wins ${computerRuns} to ${playerRuns}!`;
        } else {
            messageArea.textContent = 'Game over! It\'s a tie!';
        }
        swingButton.disabled = true;
    };

    // Handles the logic for a single swing/at-bat
    const handleSwing = (isPlayer) => {
        const result = Math.random();
        let hitResult;

        if (result < 0.2) {
            // 20% chance for a strikeout
            outs++;
            hitResult = 'Strike out! That\'s an out.';
        } else if (result < 0.6) {
            // 40% chance for a single
            isPlayer ? playerRuns++ : computerRuns++;
            hitResult = 'It\'s a hit! One run scored!';
        } else if (result < 0.8) {
            // 20% chance for a double
            isPlayer ? playerRuns += 2 : computerRuns += 2;
            hitResult = 'Double! Two runs scored!';
        } else {
            // 20% chance for a home run
            isPlayer ? playerRuns += 4 : computerRuns += 4;
            hitResult = 'HOME RUN! Four runs scored!';
        }

        messageArea.textContent = isPlayer ? `Player: ${hitResult}` : `Computer: ${hitResult}`;
        updateScoreboard();

        if (outs >= 3) {
            messageArea.textContent += isPlayer ? ' End of Player\'s turn.' : ' End of Computer\'s turn.';
            setTimeout(endTurn, 1500);
        }
    };

    // Handles the computer's turn
    const computerTurn = () => {
        if (!isPlayerTurn && inning <= 9) {
            if (outs < 3) {
                handleSwing(false);
                setTimeout(computerTurn, 1500);
            } else {
                endInning();
            }
        }
    };

    // Event listener for the "Swing" button
    swingButton.addEventListener('click', () => {
        if (isPlayerTurn) {
            handleSwing(true);
        } else {
            messageArea.textContent = 'Wait for the computer\'s turn to finish!';
        }
    });

    // Event listener for the "Reset Game" button
    resetButton.addEventListener('click', () => {
        playerRuns = 0;
        computerRuns = 0;
        inning = 1;
        outs = 0;
        isPlayerTurn = true;
        updateScoreboard();
        swingButton.disabled = false;
        messageArea.textContent = 'Game reset! Click "Swing" to start!';
    });

    // Initial scoreboard update
    updateScoreboard();
});
