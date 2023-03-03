import UI from "./UI.js";
import AppState from "./AppState.js";


export default function Renderer() {
    let _ui = UI();

    const renderTitleScreen = () => {
        document.body.innerHTML = _ui.skeleton();
    };


    return {
        renderTitleScreen
    }
}