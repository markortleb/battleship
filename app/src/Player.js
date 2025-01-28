import GameBoard from "./GameBoard";

export default function Player() {
    let gameBoard = GameBoard();

    const hasLost = function() {
        return gameBoard.getTotalLivingShips() <= 0;
    };

    return {
        hasLost,
        gameBoard
    };
}