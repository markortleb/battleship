import Ship from './Ship';


export default function GameBoard() {
    let _height = 10;
    let _width = 10;
    let _shipMap = [];

    const addShip = (x1, y1, direction, ship) => {
        let success = true;
        let x2 = x1;
        let y2 = y1;

        if (direction === 'horizontal') {
            x2 = x2 + ship.getLength() - 1;
        } else if (direction === 'vertical') {
            y2 = y2 + ship.getLength() - 1;
        } else {
            success = false;
        }

        if (0 <= x1 < _width && 0 <= x2 < _width && 0 <= y1 < _height && 0 <= y2 < _height) {
            _shipMap.push(
                {
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    ship: ship
                }
            );
        } else {
            success = false;
        }

        return success;
    };

    const getShipMap = () => {
        return _shipMap;
    };

    return {
        getShipMap
    };
}
