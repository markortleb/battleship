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

    const renderChoosingScreen = () => {
        let gameAreaNode = document.querySelectorAll('.game-area')[0];
        gameAreaNode.classList.remove('title-screen');
        gameAreaNode.classList.add('choosing-screen');
        gameAreaNode.innerHTML = '';

        gameAreaNode.insertAdjacentHTML(
            'beforeend',
            _ui.choosingScreenInner(_appState.shipList[_appState.currentPlacingIndex].name)
        );
    }

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
                let cell = userBoardNode.rows[i].cells[x];
                cell.classList.add('ship-placement');
            }
        } else if (orientation === 'horizontal') {
            for (let i = x; i < x + length; i++) {
                let cell = userBoardNode.rows[y].cells[i];
                cell.classList.add('ship-placement');
            }
        }
    };


    return {
        renderSkeleton,
        renderTitleScreen,
        init,
        renderChoosingScreen,
        renderPlacementHighlight,
        renderClearHighlight
    }
}