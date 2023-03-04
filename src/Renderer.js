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

    return {
        renderSkeleton,
        renderTitleScreen,
        init,
        renderChoosingScreen
    }
}