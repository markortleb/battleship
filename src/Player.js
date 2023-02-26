import GameBoard from "./GameBoard";

export default function Player(type) {
    let _gameBoard = GameBoard();
    let _type = type;

    const getType = function () {
        return _type;
    };

    const hasLost = function() {
        return _gameBoard.getTotalLivingShips() > 0;
    };

    return {
        getType,
        hasLost
    };
}