
export default function Ship(length) {
    const _length = length;
    let _numHits = 0;

    const hit = () => {
        _numHits++;
    };

    const isSunk = () => {
        let sunk = false;
        if (_numHits >= _length) {
            sunk = true;
        }

        return sunk;
    };

    return {
        hit,
        isSunk
    }
}