export function MoodBoardItem({ color, image, description }) {
    return (
        <div className="mood-board-item" style={{ backgroundColor: color }}>
            <img className="mood-board-image" src={image} style={{ backgroundColor: color }} />
            <h3 className="mood-board-text">{description}</h3>
        </div>
    );
}

export function MoodBoard() {

    const items = [
        {
            id: 1,
            color: "lightblue",
            image: "https://cdn.freecodecamp.org/curriculum/labs/pathway.jpg",
            description: "A beautiful view inside the nature."
        },
        {
            id: 2,
            color: "orange",
            image: "https://cdn.freecodecamp.org/curriculum/labs/grass.jpg",
            description: "A vaste spread space."
        },
        {
            id: 3,
            color: "lightgreen",
            image: "https://cdn.freecodecamp.org/curriculum/labs/shore.jpg",
            description: "Shores and rocks stand still."
        }
    ]

    return (
        <div>
            <h1 className="mood-board-heading">Destination Mood Board</h1>
            <div className="mood-board">
                {items.map((items) => (
                    <MoodBoardItem
                        key={items.id}
                        color={items.color}
                        image={items.image}
                        description={items.description}
                    />
                ))}
            </div>
        </div>
    );
}