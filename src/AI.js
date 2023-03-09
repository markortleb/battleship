import Player from "./Player.js";


export default function AI(player) {

    let _player = player;

    const randomlyPlaceShip = (ship) => {
        let keepTrying = true;

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        while (keepTrying) {
            let x = getRandomInt(0, 9);
            let y = getRandomInt(0, 9);
            let orientation = getRandomInt(0, 1) === 1 ? 'horizontal' : 'vertical';

            keepTrying = !_player.gameBoard.addShip(x, y, orientation, ship);
        }
    };

    const takeTurn = () => {

    };

    return Object.assign(_player, {
        takeTurn,
        randomlyPlaceShip
    });
}