import UI from "./UI.js";
import AppState from "./AppState.js";


export default function Renderer() {
    let _ui = UI();

    const renderSkeleton = () => {
        document.body.innerHTML = _ui.skeleton();
    };

    const renderTitleScreen = () => {
        let gameAreaNode = document.querySelectorAll('.game-area')[0];
        gameAreaNode.classList.add('title-screen')
        gameAreaNode.insertAdjacentHTML('beforeend', _ui.titleScreenInner());
    };

    return {
        renderSkeleton,
        renderTitleScreen
    }
}