import Player from "./Player";
import AI from "./AI";
import Ship from "./Ship";


export default function EventBoard (appState, renderer) {
    let _appState = appState;
    let _renderer = renderer;

    const _initPlayButton = () => {
        const playButtonNode = document.querySelectorAll('.play-button')[0];
        playButtonNode.addEventListener('click', e => {
            _appState.player = Player();
            _appState.enemy = AI(Player());
            _appState.currentPlacingIndex = 0;
            _appState.choosingOrientation = 'vertical';
            _renderer.renderChoosingScreen();
            _initChoosingBoard();
        });
    };

    const init = () => {
        _initPlayButton();
    };

    const _initChoosingBoard = () => {
        const choosingBoardNode = document.querySelectorAll('.choosing-screen .user-board')[0];
        const tdNodes = choosingBoardNode.querySelectorAll('td');
        const leftArrowNode = document.querySelectorAll('.info-area img:first-of-type')[0];
        const rightArrowNode = document.querySelectorAll('.info-area img:last-of-type')[0];

        const refreshHighlight = () => {
            let tdNode = choosingBoardNode.querySelectorAll('td:hover')[0];
            if (tdNode !== undefined) {
                let trNode = tdNode.closest('tr');
                _renderer.renderPlacementHighlight(tdNode.cellIndex, trNode.rowIndex);
            }
        };

        tdNodes.forEach(node => node.addEventListener('click', e => {
            let x = node.cellIndex;
            let y = node.closest('tr').rowIndex;
            let addedShip = _appState.player.gameBoard.addShip(
                x,
                y,
                _appState.choosingOrientation,
                Ship(_appState.shipList[_appState.currentPlacingIndex].size)
            );

            if (addedShip) {
                _appState.enemy.randomlyPlaceShip(Ship(_appState.shipList[_appState.currentPlacingIndex].size));
                console.log(_appState.enemy.gameBoard.getTotalShips());
                _appState.currentPlacingIndex += 1;
                if (_appState.currentPlacingIndex < _appState.shipList.length) {
                    _renderer.renderChoosingScreen();
                    _initChoosingBoard();
                } else {
                    _renderer.renderPlayingScreen();
                    _initPlayingBoard();
                }
            }

        }));

        choosingBoardNode.addEventListener('mouseover', e => {
            refreshHighlight();
        });

        choosingBoardNode.addEventListener('mouseleave', e => {
            _renderer.renderClearHighlight();
        });

        leftArrowNode.addEventListener('click', e => {
            if (_appState.choosingOrientation === 'vertical') {
                _appState.choosingOrientation = 'horizontal';
            } else {
                _appState.choosingOrientation = 'vertical';
            }
        });

        rightArrowNode.addEventListener('click', e => {
            if (_appState.choosingOrientation === 'vertical') {
                _appState.choosingOrientation = 'horizontal';
            } else {
                _appState.choosingOrientation = 'vertical';
            }
        });
    };


    const _initPlayingBoard  = () => {
        const enemyBoardNode = document.querySelectorAll('.playing-screen .enemy-board')[0];
        const enemyTdNodes = enemyBoardNode.querySelectorAll('td');

        enemyTdNodes.forEach(node => node.addEventListener('click', e => {
            let x = node.cellIndex;
            let y = node.closest('tr').rowIndex;
            _appState.enemy.gameBoard.hit(x, y);
            _appState.enemy.takeTurn(_appState.player.gameBoard);
            _renderer.renderPlayingScreen();
            _initPlayingBoard();

            if (_appState.enemy.hasLost() || _appState.player.hasLost()) {
                _renderer.renderResultScreen();

                _initPlayButton();
            }

        }));
    };

    return {
        init
    };
}