
export default function Ship(length) {
    const _length = length;
    let _numHits = 0;

    const hit = () => {
        if (_numHits < _length) {
            _numHits++;
        }
    };

    const isSunk = () => {
        let sunk = false;
        if (_numHits >= _length) {
            sunk = true;
        }

        return sunk;
    };

    const getLength = () => {
        return _length;
    };

    const getNumHits = () => {
        return _numHits;
    };

    return {
        hit,
        isSunk,
        getLength,
        getNumHits
    }
}