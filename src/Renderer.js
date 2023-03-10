import UI from "./UI.js";


export default function Renderer(appState) {
    let _appState = appState;
    let _ui = UI();

    const renderSkeleton = () => {
        document.body.innerHTML = _ui.skeleton();
    };

    const renderTitleScreen = () => {
        let gameAreaNode = document.querySelectorAll('.game-area')[0];
        gameAreaNode.classList.add('title-screen')
        gameAreaNode.insertAdjacentHTML('beforeend', _ui.titleScreenInner());
    };

    const init = () => {
        renderSkeleton();
        renderTitleScreen();
    };

    const _renderShips = (player, boardClass) => {
        const boardNode = document.querySelectorAll(`.${boardClass}`)[0];
        const tdNodes = boardNode.querySelectorAll('td');

        tdNodes.forEach(node => {
            let x = node.cellIndex;
            let y = node.closest('tr').rowIndex;

            if (player.gameBoard.isSpotTaken(x, y)) {
                node.classList.add('ship');
            } else {
                node.classList.remove('ship');
            }
        });
    };

    const _renderHits = (player, boardClass) => {
        const boardNode = document.querySelectorAll(`.${boardClass}`)[0];
        const tdNodes = boardNode.querySelectorAll('td');

        tdNodes.forEach(node => {
            let x = node.cellIndex;
            let y = node.closest('tr').rowIndex;

            if (player.gameBoard.isSpotHit(x, y)) {
                node.innerHTML = 'X';
                if (player.gameBoard.isSpotTaken(x, y)) {
                    node.classList.remove('ship');
                    node.classList.add('ship-hit');
                }
            } else {
                node.innerHTML = '';
                node.classList.remove('ship-hit');
            }
        });
    };

    const renderChoosingScreen = () => {
        let gameAreaNode = document.querySelectorAll('.game-area')[0];
        gameAreaNode.classList.remove('title-screen');
        gameAreaNode.classList.remove('result-screen');
        gameAreaNode.classList.add('choosing-screen');
        gameAreaNode.innerHTML = '';

        gameAreaNode.insertAdjacentHTML(
            'beforeend',
            _ui.choosingScreenInner(_appState.shipList[_appState.currentPlacingIndex].name)
        )

        _renderShips(_appState.player, 'user-board');

    };

    const renderClearHighlight = () => {
        Array.from(document.querySelectorAll('.ship-placement'))
            .forEach((el) => el.classList.remove('ship-placement'));
    };

    const renderPlacementHighlight = (x, y) => {
        let userBoardNode = document.querySelectorAll('.choosing-screen .user-board')[0];
        let length = _appState.shipList[_appState.currentPlacingIndex].size;
        let orientation = _appState.choosingOrientation;

        // Remove all instances of the ship-placement task
        renderClearHighlight();

        if (orientation === 'vertical') {
            for (let i = y; i < y + length; i++) {
                if (0 <= x && x < 10 && 0 <= i && i < 10) {
                    let cell = userBoardNode.rows[i].cells[x];
                    cell.classList.add('ship-placement');
                }
            }
        } else if (orientation === 'horizontal') {
            for (let i = x; i < x + length; i++) {
                if (0 <= i && i < 10 && 0 <= y && y < 10) {
                    let cell = userBoardNode.rows[y].cells[i];
                    cell.classList.add('ship-placement');
                }
            }
        }
    };

    const renderPlayingScreen = () => {
        let gameAreaNode = document.querySelectorAll('.game-area')[0];
        let status = {
            playerHitPoints: `${_appState.player.gameBoard.getHealth()}/${_appState.player.gameBoard.getTotalShipArea()}`,
            playerShips: `${_appState.player.gameBoard.getTotalLivingShips()}/${_appState.player.gameBoard.getTotalShips()}`,
            enemyHitPoints: `${_appState.enemy.gameBoard.getHealth()}/${_appState.enemy.gameBoard.getTotalShipArea()}`,
            enemyShips: `${_appState.enemy.gameBoard.getTotalLivingShips()}/${_appState.enemy.gameBoard.getTotalShips()}`
        };
        gameAreaNode.classList.remove('choosing-screen');
        gameAreaNode.classList.add('playing-screen');
        gameAreaNode.innerHTML = '';

        gameAreaNode.insertAdjacentHTML(
            'beforeend',
            _ui.playingScreenInner(status)
        );


        _renderShips(_appState.player, 'user-board');
        _renderHits(_appState.player, 'user-board');
        _renderHits(_appState.enemy, 'enemy-board');
    };


    const renderResultScreen = () => {
        let gameAreaNode = document.querySelectorAll('.game-area')[0];
        let playerWon = false;
        gameAreaNode.classList.remove('playing-screen');
        gameAreaNode.classList.add('result-screen');
        gameAreaNode.innerHTML = '';

        if (_appState.enemy.hasLost()) {
            playerWon = true;
        }

        gameAreaNode.insertAdjacentHTML(
            'beforeend',
            _ui.resultScreenInner(playerWon)
        );

    };

    return {
        renderSkeleton,
        renderTitleScreen,
        init,
        renderChoosingScreen,
        renderPlacementHighlight,
        renderClearHighlight,
        renderPlayingScreen,
        renderResultScreen
    }
}