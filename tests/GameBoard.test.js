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

        expect(gameBoard.addShip(0, 2, 'vertical', ship2)).toBe(false);
    });

    it('Test that ships cannot intersect perpendicularly. Expect to fail to add ship.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(2, 0, 'vertical', ship1);

        expect(gameBoard.addShip(0, 2, 'horizontal', ship2)).toBe(false);
    });

    it('Test that ships cannot intersect in parallel, vertically . Expect to fail to add ship.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(2, 2, 'vertical', ship1);

        expect(gameBoard.addShip(2, 0, 'vertical', ship2)).toBe(false);
    });

    it('Test that ships cannot intersect in parallel, horizontally . Expect to fail to add ship.', () => {
        let gameBoard = GameBoard();
        let ship1 = Ship(3);
        let ship2 = Ship(5);

        gameBoard.addShip(2, 2, 'horizontal', ship1);

        expect(gameBoard.addShip(0, 2, 'horizontal', ship2)).toBe(false);
    });
});