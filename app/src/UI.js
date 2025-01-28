import LeftArrowImg from './img/arrow-left-bold-box-outline.svg';
import RightArrowImg from './img/arrow-right-bold-box-outline.svg';


export default function UI() {

    let _arrowLeftImg = new Image();
    let _arrowRightImg = new Image();

    _arrowLeftImg.src = LeftArrowImg;
    _arrowRightImg.src = RightArrowImg;

    const _getBoard = (className, width, height) => {
        let userBoardHtml = `<table class="${className}">`;

        for (let i = 0; i < height; i++) {
            userBoardHtml += '<tr>'
            for (let j = 0; j < width; j++) {
                userBoardHtml += '<td></td>'
            }
            userBoardHtml += '</tr>'
        }
        userBoardHtml += '</table>'

        return userBoardHtml;
    };

    const skeleton = () => {
        return `
            <div class="title-area">
                <h1>Battleship</h1>
            </div>
            <div class="game-area">
            </div>
        `;
    }

    const titleScreenInner = () => {
        return `
            <span class="play-button">Play Game!</span>
        `;
    }

    const choosingScreenInner = (initialShipName) => {
        return `
        <span class="instructions">
            Place your <span class="ship-name">${initialShipName}</span>.
        </span>
        ${_getBoard('user-board',10, 10)}
        <div class="info-area">
            <img src="${_arrowLeftImg.src}" alt="">
            <span>Use buttons to change orientation.</span>
            <img src="${_arrowRightImg.src}" alt="">
        </div>        
        `;
    }

    const playingScreenInner = (status) => {
        return `
        <ul class="board-area">
            <li class="player-area">
                <span class="board-name">You</span>
                <div class="stats-area">
                    <span>HP: ${status.playerHitPoints}</span>
                    <span>Ships: ${status.playerShips}</span>
                </div>
                ${_getBoard('user-board',10, 10)}
            </li>
            <li class="enemy-area">
                <span class="board-name">Enemy</span>
                <div class="stats-area">
                    <span>HP: ${status.enemyHitPoints}</span>
                    <span>Ships: ${status.enemyShips}</span>
                </div>
                ${_getBoard('enemy-board',10, 10)}
            </li>
        </ul>
        `;
    };

    const resultScreenInner = (playerWon) => {
        let resultClass = 'lose';
        let resultMessage = 'Enemy Wins, You Lose!';

        if (playerWon) {
            resultClass = 'won';
            resultMessage = 'You win!';
        }

        return `
            <h2>Game Over!</h2>
            <span class="result ${resultClass}">${resultMessage}</span>
            <span class="play-button">Play Again?</span>
        `;
    };

    return {
        skeleton,
        titleScreenInner,
        choosingScreenInner,
        playingScreenInner,
        resultScreenInner
    };
}