import GameBoard from "../src/GameBoard";
import Ship from "../src/Ship";


describe('GameBoard', () => {
    it('Test adding a horizontal ship to the GameBoard.', () => {
        let gameBoard = GameBoard();
        let ship = Ship(3);
        let x1 = 1
        let y1 = 1

        expect(gameBoard.addShip(x1, y1, 'horizontal', ship)).toBe(true);
    });

    it('Test adding a horizontal ship to the GameBoard.', () => {
        let gameBoard = GameBoard();
        let ship = Ship(3);
        let x1 = 1
        let y1 = 1

        expect(gameBoard.addShip(x1, y1, 'vertical', ship)).toBe(true);
    });

    it('Test adding a ship with indeterminate direction. Expect to fail to add ship.', () => {
        let gameBoard = GameBoard();
        let ship = Ship(3);
        let x1 = 1
        let y1 = 1

        expect(gameBoard.addShip(x1, y1, 'indeterminate', ship)).toBe(false);
    });

    it('Test adding a horizontal ship that cannot fit in the border. Expect to fail to add ship.', () => {
        let gameBoard = GameBoard();
        let ship = Ship(3);
        let x1 = 8
        let y1 = 8

        expect(gameBoard.addShip(x1, y1, 'horizontal', ship)).toBe(false);
    });

    it('Test adding a vertical ship that cannot fit in the border. Expect to fail to add ship.', () => {
        let gameBoard = GameBoard();
        let ship = Ship(3);
        let x1 = 8
        let y1 = 8

        expect(gameBoard.addShip(x1, y1, 'vertical', ship)).toBe(false);
    });

    it('Test that multiple non intersecting ships can be added. Expect to add ship.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(2, 0, 'vertical', ship1);

        expect(gameBoard.addShip(0, 2, 'vertical', ship2)).toBe(true);
    });

    it('Test that ships cannot intersect perpendicularly. Expect to fail to add ship.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(2, 0, 'vertical', ship1);

        expect(gameBoard.addShip(0, 2, 'horizontal', ship2)).toBe(false);
    });

    it('Test that ships cannot intersect in parallel, vertically. Expect to fail to add ship.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(2, 2, 'vertical', ship1);

        expect(gameBoard.addShip(2, 0, 'vertical', ship2)).toBe(false);
    });

    it('Test that ships cannot intersect in parallel, horizontally. Expect to fail to add ship.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(2, 2, 'horizontal', ship1);

        expect(gameBoard.addShip(0, 2, 'horizontal', ship2)).toBe(false);
    });

    it('Test hitting board and missing any ships. Expect false.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(1, 1, 'horizontal', ship1);
        gameBoard.addShip(5, 3, 'vertical', ship2);

        expect(gameBoard.hit(8,8)).toBe(false);
    });

    it('Test hitting board and getting a hit on a ship. Expect true.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(1, 1, 'horizontal', ship1);
        gameBoard.addShip(5, 3, 'vertical', ship2);

        expect(gameBoard.hit(5,5)).toBe(true);
    });

    it('Test hitting a ship once, and get the correct number of health.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(1, 1, 'horizontal', ship1);
        gameBoard.addShip(5, 3, 'vertical', ship2);
        gameBoard.hit(5,5);

        expect(gameBoard.getHealth()).toBe(7);
    });

    it('Test adding some ships and getting correct total ship area.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(1, 1, 'horizontal', ship1);
        gameBoard.addShip(5, 3, 'vertical', ship2);
        gameBoard.hit(5,5);

        expect(gameBoard.getTotalShipArea()).toBe(8);
    });

    it('Test adding some ships and getting correct total number of ships.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(1, 1, 'horizontal', ship1);
        gameBoard.addShip(5, 3, 'vertical', ship2);

        expect(gameBoard.getTotalShips()).toBe(2);
    });

    it('Test adding some ships, sinking one, and getting total standing ships.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(1, 1, 'horizontal', ship1);
        gameBoard.addShip(5, 3, 'vertical', ship2);
        gameBoard.hit(1,1);
        gameBoard.hit(2,1);
        gameBoard.hit(3,1);

        expect(gameBoard.getTotalLivingShips()).toBe(1);
    });


    it('Test hitting the board a few times, and get correct points.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);
        let expectMap = [
            {x:1, y:1},
            {x:3, y:2},
            {x:7, y:0}
        ];

        gameBoard.addShip(1, 1, 'horizontal', ship1);
        gameBoard.addShip(5, 3, 'vertical', ship2);
        gameBoard.hit(1,1);
        gameBoard.hit(3,2);
        gameBoard.hit(7,0);

        expect(gameBoard.getHitMap().sort()).toEqual(expectMap.sort());
    });

    it('Test placing a ship, then checking if that spot is taken.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);

        gameBoard.addShip(1, 1, 'horizontal', ship1);

        expect(gameBoard.isSpotTaken(2,1)).toBe(true);
    });

    it('Test placing a ship, then checking if empty spot is taken.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);

        gameBoard.addShip(1, 1, 'horizontal', ship1);

        expect(gameBoard.isSpotTaken(3,3)).toBe(false);
    });

});
