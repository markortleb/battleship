import AppState from "./AppState.js";
import Renderer from "./Renderer.js";
import EventBoard from "./EventBoard";


export default function Controller() {
    let _appState = AppState();
    let _renderer = Renderer(_appState);
    let _eventBoard = EventBoard(_appState, _renderer);

    const init = () => {
        _renderer.init();
        _eventBoard.init();
    };


    return {
        init
    }
}