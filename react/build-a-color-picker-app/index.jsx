const { useState } = React;

export const ColorPicker = () => {
    const [color, setColor] = useState("#ffffff");

    const handleColorSelection = (event) => {
        setColor(event.target.value);
    };

    return (
        <div
            id="color-picker-container"
            style={{ backgroundColor: color }}
        >
            <p>Choose a color using the color input below:</p>

            <input
                type="color"
                value={color}
                id="color-input"
                onChange={handleColorSelection}
            />
        </div>
    );
};