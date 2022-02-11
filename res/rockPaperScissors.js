"use strict";

/**
 * Rock Paper Scissors Game
 * @class
 * @property {number} hands        - Number of Hands
 * @property {number} goal         - Number of Wins
 * @property {number} userHand     - User Hand
 * @property {number} compHand     - CPU Hand
 * @property {number} userScore    - User Score
 * @property {number} compScore    - CPU Score
 * @property {array}  hand         - Array of Hand Objects
 * @property {object} userDiv      - User Score Element
 * @property {object} compDiv      - CPU Score Element
 * @property {object} gameInfo     - Game Info Element
 * @property {object} options      - Options Element
 * @property {object} selections   - Selections Element
 * @property {object} userStatus   - User Status Element
 * @property {object} roundInfo    - Round Info Element
 * @property {object} imgUser      - User Selection Element
 * @property {object} imgComp      - CPU Selection Element
 * @property {object} btnNextRound - Next Round Button Element
 * @property {object} btnGameOver  - Game Over Button Element
 * @author  Dean Wagner <info@deanwagner.net>
 */
class RockPaperScissors {

    // Class Properties
    hands     = 2;
    goal      = 5;
    userHand  = -1;
    compHand  = -1;
    userScore = 0;
    compScore = 0;

    // Object Array For Hands
    hand = [{
        name : 'Rock',
        win  : 'Rock beats Scissors',
        img  : './img/rock.svg'
    }, {
        name : 'Paper',
        win  : 'Paper beats Rock',
        img  : './img/paper.svg'
    }, {
        name : 'Scissors',
        win  : 'Scissors beats Paper',
        img  : './img/scissors.svg'
    }];

    /**
     * Constructor
     * @constructor
     */
    constructor() {

        // Class Elements
        this.userDiv      = document.getElementById('userScore');
        this.compDiv      = document.getElementById('compScore');
        this.gameInfo     = document.getElementById('gameInfo');
        this.options      = document.getElementById('options');
        this.selections   = document.getElementById('selections');
        this.userStatus   = document.getElementById('userStatus');
        this.roundInfo    = document.getElementById('roundInfo');
        this.imgUser      = document.getElementById('imgUserSelection');
        this.imgComp      = document.getElementById('imgCompSelection');
        this.btnNextRound = document.getElementById('nextRound');
        this.btnGameOver  = document.getElementById('gameOver');

        // Rock/Paper/Scissors Click Events
        const links = this.options.getElementsByTagName('a');
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener('click', (e) => {
                e.preventDefault();
                this.startRound(links[i].dataset.index);
            });
        }

        // Next Round Button Click Event
        this.btnNextRound.addEventListener('click', () => {
            this.nextRound();
        });

        // Game Over Button Click Event
        this.btnGameOver.addEventListener('click', () => {
            this.resetUI();
        });
    }

    /**
     * Starts the Round
     * @param {string} index - User Selection Index
     */
    startRound(index) {
        // Validate User Hand
        this.userHand = parseInt(index);
        if (this.userHand >= 0 && this.userHand <= this.hands) {
            // Get Computer Hand
            this.compHand = this.getCompHand();
            // Calculate Winner
            this.calculateWinner();
        } else {
            // Invalid Input
            this.error('Invalid Input');
        }
    }

    /**
     * Get Computer Hand
     * @returns {number} - Random Number 0-2
     */
    getCompHand() {
        return Math.floor(Math.random() * (this.hands + 1));
    }

    /**
     * Calculate Winner
     */
    calculateWinner() {
        switch(true) {
            case (this.userHand === this.compHand):
                this.tie();
                break;
            
            case ((this.userHand === 0) && (this.compHand === this.hands)):
                this.userWin();
                break;

            case ((this.userHand === this.hands) && (this.compHand === 0)):
                this.userLose();
                break;

            case (this.userHand > this.compHand):
                this.userWin();
                break;

            case (this.userHand < this.compHand):
                this.userLose();
                break;

            default:
                this.error('Unable to Determine Winner');
        }
    }

    /**
     * Handle Tie
     */
    tie() {
        this.userStatus.innerText = 'DRAW';
        this.roundInfo.innerText = 'You both played ' + this.hand[this.userHand].name;
        this.finishRound();
    }

    /**
     * Handle User Win
     */
    userWin() {
        this.userScore++;
        this.userDiv.innerText = this.userScore.toString();
        this.userStatus.innerText = 'YOU WIN';
        this.roundInfo.innerText = this.hand[this.userHand].win;
        this.finishRound();
    }

    /**
     * Handle User Loss
     */
    userLose() {
        this.compScore++;
        this.compDiv.innerText = this.compScore.toString();
        this.userStatus.innerText = 'YOU LOSE';
        this.roundInfo.innerText = this.hand[this.compHand].win;
        this.finishRound();
    }

    /**
     * Finish the Round
     */
    finishRound() {
        // Update Selection Images
        this.imgUser.src = this.hand[this.userHand].img;
        this.imgUser.alt = this.hand[this.userHand].name;
        this.imgComp.src = this.hand[this.compHand].img;
        this.imgComp.alt = this.hand[this.compHand].name;

        // Hide Options / Show Selections
        this.options.style.display = 'none';
        this.selections.style.display = 'flex';

        // Check Score
        if ((this.userScore === this.goal) || (this.compScore === this.goal)) {
            this.gameOver();
        }
    }

    /**
     * Begin Next Round
     */
    nextRound() {
        // Show Options / Hide Selections
        this.selections.style.display = 'none';
        this.options.style.display = 'flex';
    }

    /**
     * Handle End of Game
     */
    gameOver() {
        let message;
        if (this.userScore === this.goal) {
            message = 'V I C T O R Y';
        } else {
            message = 'D E F E A T';
        }
        this.gameInfo.innerText = message;
        this.btnNextRound.style.display = 'none';
        this.btnGameOver.style.display = 'block';
    }

    /**
     * Reset the UI for New Game
     */
    resetUI() {
        this.userHand  = -1;
        this.compHand  = -1;
        this.userScore = 0;
        this.compScore = 0;

        this.userDiv.innerText = '0';
        this.compDiv.innerText = '0';

        this.gameInfo.innerText = 'First to 5 Wins';

        this.userStatus.innerText = '';
        this.roundInfo.innerText  = '';

        this.imgUser.src = '';
        this.imgUser.alt = '';
        this.imgComp.src = '';
        this.imgComp.alt = '';

        this.btnNextRound.style.display = 'block';
        this.btnGameOver.style.display  = 'none';
        this.selections.style.display   = 'none';
        this.options.style.display      = 'flex';
    }

    /**
     * Handle Error
     * @param {string} message - Message Text
     */
    error(message) {
        // Hide All Sections
        const scoreBoard = document.getElementById('scoreBoard');
        scoreBoard.style.display = 'none';
        this.selections.style.display = 'none';
        this.options.style.display = 'none';
        
        // Show Message
        alert(message);

        // Reload Page
        location.reload();
    }
}