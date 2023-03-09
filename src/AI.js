import Player from "./Player.js";


export default function AI(player) {

    let _player = player;

    const _getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    const randomlyPlaceShip = (ship) => {
        let keepTrying = true;

        while (keepTrying) {
            let x = _getRandomInt(0, 9);
            let y = _getRandomInt(0, 9);
            let orientation = _getRandomInt(0, 1) === 1 ? 'horizontal' : 'vertical';

            keepTrying = !_player.gameBoard.addShip(x, y, orientation, ship);
        }
    };

    const takeTurn = (otherBoard) => {
        let keepTrying = true;

        while (keepTrying) {
            let x = _getRandomInt(0, 9);
            let y = _getRandomInt(0, 9);

            if (!otherBoard.isSpotHit(x, y)) {
                otherBoard.hit(x, y);
                keepTrying = false;
            }
        }

    };

    return Object.assign(_player, {
        takeTurn,
        randomlyPlaceShip
    });
}