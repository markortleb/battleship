import AppState from "./AppState.js";
import Renderer from "./Renderer.js";


export default function Controller() {
    let _renderer = Renderer();

    const init = () => {
        _renderer.renderTitleScreen();
    };


    return {
        init
    }
}