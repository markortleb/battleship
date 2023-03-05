import Player from "./Player";


export default function EventBoard (appState, renderer) {
    let _appState = appState;
    let _renderer = renderer;

    const initPlayButton = () => {
        const playButtonNode = document.querySelectorAll('.play-button')[0];
        playButtonNode.addEventListener('click', e => {
            _appState.player = Player();
            _renderer.renderChoosingScreen();
            initChoosingBoard();
        });
    };

    const init = () => {
        initPlayButton();
    };

    const initChoosingBoard = () => {
        const choosingBoardNode = document.querySelectorAll('.user-board')[0];
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

            console.log(x + ' ' + y);
            _appState.currentPlacingIndex += 1;
            _renderer.renderChoosingScreen();
            initChoosingBoard();
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

    return {
        initPlayButton,
        init
    };
}