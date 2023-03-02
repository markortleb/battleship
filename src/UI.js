

export default function UI() {

    const _getUserBoard = (width, height) => {
        let userBoardHtml = '<table class="user-board">';

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
            <span>Play Game!</span>
        `;
    }



    const choosingScreenInner = (initialShipName) => {
        return `
        <span class="instructions">
            Place your <span class="ship-name">${initialShipName}</span>.
        </span>
        ${_getUserBoard(10, 10)}
        <div class="info-area">
            <img src="src/img/arrow-left-bold-box-outline.svg" alt="">
            <span>Use arrow keys to change orientation.</span>
            <img src="src/img/arrow-right-bold-box-outline.svg" alt="">
        </div>        
        `;
    }

    return {
        skeleton,
        titleScreenInner,
        choosingScreenInner
    }
}