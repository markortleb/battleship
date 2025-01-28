import Ship from "../src/Ship";


describe('Ship', () => {
    it('Check the getLength function of Ship.', () => {
        let ship = Ship(5);
        expect(ship.getLength()).toBe(5);
    });

    it('Check if Ship with len=2 can be sunk after 2 hits.', () => {
        let ship = Ship(2);

        ship.hit();
        ship.hit();

        expect(ship.isSunk()).toBe(true);
    });

    it('Check if Ship with len=2 is not sunk after 1 hits.', () => {
        let ship = Ship(2);

        ship.hit();

        expect(ship.isSunk()).toBe(false);
    });

    it('Hit Ship 3 times and make sure getNumHits returns 3.', () => {
        let ship = Ship(5);
        let numHitsToExpect = 3;

        for (let i = 0; i < numHitsToExpect; i++) {
            ship.hit();
        }

        expect(ship.getNumHits()).toBe(numHitsToExpect);
    });
});
