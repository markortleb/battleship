import Ship from './Ship';


export default function GameBoard() {
    const _height = 10;
    const _width = 10;
    let _shipMap = [];
    let _hitMap = [];

    const _inRay = (min, x, max) => {
        return min <= x && x < max;
    };

    const _markHitMap = (x, y) => {
        let point = {x:x, y:y};
        if (_hitMap.filter(item => item.x === x && item.y === y).length === 0) {
            _hitMap.push(point);
        }
    };

    const _hitShip = (x, y) => {
        let directHit = false;

        for (let i = 0; i < _shipMap.length; i++) {
            let shipCoordinates = _getShipCoordinates(
                _shipMap[i].x1,
                _shipMap[i].y1,
                _shipMap[i].x2,
                _shipMap[i].y2
            );

            if (shipCoordinates.filter(item => item.x === x && item.y === y).length > 0) {
                _shipMap[i].ship.hit();
                directHit = true;
            }
        }

        return directHit;
    };

    const _onBoard = (x1, y1, x2, y2) => {
        const check1 = _inRay(0, x1, _width) && _inRay(0, y1, _height);
        const check2 = _inRay(0, x2, _width) && _inRay(0, y2, _height);

        return check1 && check2;
    };

    const _getShipCoordinates = (x1, y1, x2, y2) => {
        let shipCoordinates = [];

        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                shipCoordinates.push(
                    {
                        x: x,
                        y: y
                    }
                );
            }
        }

        return shipCoordinates;
    };

    const _isShipBlocked = (x1, y1, x2, y2) => {
        const shipCoordinates = _getShipCoordinates(x1, y1, x2, y2);
        let shipBlocked = false;

        for (let i = 0; i < _shipMap.length; i++) {
            let otherShipCoordinates = _getShipCoordinates(
                _shipMap[i].x1,
                _shipMap[i].y1,
                _shipMap[i].x2,
                _shipMap[i].y2
            );

            if (otherShipCoordinates.some(r => shipCoordinates.filter(t => t.x === r.x && t.y === r.y).length > 0)) {
               shipBlocked = true;
            }
        }

        return shipBlocked;
    };

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

        if (success && _onBoard(x1, y1, x2, y2) && !_isShipBlocked(x1, y1, x2, y2)) {
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

    const hit = (x, y) => {
        let directHit = false;

        if (_inRay(0, x, _width) && _inRay(0, y, _height)) {
            _markHitMap(x, y);
            directHit = _hitShip(x, y);
        }

        return directHit;
    }

    const getHealth = () => {
        let health = 0;
        for (let i = 0; i < _shipMap.length; i++) {
            health += _shipMap[i].ship.getLength() - _shipMap[i].ship.getNumHits();
        }
        return health;
    };

    const getTotalShips = () => {
        return _shipMap.length;
    };

    const getTotalLivingShips = () => {
        return _shipMap.filter(item => !item.ship.isSunk()).length;
    };

    const getTotalShipArea = () => {
        let shipArea = 0;
        for (let i = 0; i < _shipMap.length; i++) {
            shipArea += _shipMap[i].ship.getLength();
        }
        return shipArea;
    };

    const getHitMap = () => {
        return _hitMap;
    };

    const isSpotTaken = (x, y) => {
        let spotTaken = false;

        _shipMap.forEach(ship => {
            _getShipCoordinates(ship.x1, ship.y1, ship.x2, ship.y2).forEach(coord => {
                if (coord.x === x && coord.y === y) {
                    spotTaken = true;
                }
            });
        });

        return spotTaken
    };

    const isSpotHit = (x, y) => {
        let isSpotHit = false;

        _hitMap.forEach(point => {
            if (point.x === x && point.y === y) {
                isSpotHit = true;
            }
        });

        return isSpotHit;
    };

    return {
        addShip,
        getHealth,
        getHitMap,
        getTotalShipArea,
        getTotalShips,
        getTotalLivingShips,
        hit,
        isSpotTaken,
        isSpotHit
    };
}
