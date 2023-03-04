

export default function AppState() {
    let player = null;
    let enemy = null;

    let currentPlacingIndex = 0;
    let choosingOrientation = 'vertical';

    const shipList = [
        {name: 'Carrier', size: 5},
        {name: 'Battleship', size: 4},
        {name: 'Cruiser', size: 3},
        {name: 'Submarine', size: 3},
        {name: 'Destroyer', size: 2},
    ];

    return {
        player,
        enemy,
        currentPlacingIndex,
        shipList
    };
}
