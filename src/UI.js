

export default function UI() {

    const skeleton = () => {
        return `
            <div class="title-area">
                <h1>Battleship</h1>
            </div>
            <div class="game-area">
            </div>
        `;
    }

    return {
        skeleton
    }
}