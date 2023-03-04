


export default function EventBoard (appState, renderer) {
    let _appState = appState;
    let _renderer = renderer;

    const initPlayButton = () => {
        const playButtonNode = document.querySelectorAll('.play-button')[0];
        playButtonNode.addEventListener('click', e => {
            _renderer.renderChoosingScreen();
            initChoosingBoard();
        });
    };

    const init = () => {
        initPlayButton();
    };

    const initChoosingBoard = () => {
        const choosingBoardNode = document.querySelectorAll('.user-board')[0];

        choosingBoardNode.addEventListener('click', e => {
            _appState.currentPlacingIndex += 1;
            _renderer.renderChoosingScreen();
            initChoosingBoard();
        });
    };

    return {
        initPlayButton,
        init
    };
}