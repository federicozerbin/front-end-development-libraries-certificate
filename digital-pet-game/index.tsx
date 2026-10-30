const { useState } = React;
import type { FormEvent } from "react";

enum Action {
    Eat = "eat",
    Play = "play",
    Sleep = "sleep",
}

enum PetMood {
    Happy = "Happy",
    Excited = "Excited",
    Content = "Content",
    Sad = "Sad",
    Tired = "Tired",
    Sick = "Sick",
    Hungry = "Hungry",
}

const MOOD_EMOJI: Record<PetMood, string> = {
    [PetMood.Happy]: "😊",
    [PetMood.Excited]: "🤩",
    [PetMood.Content]: "🙂",
    [PetMood.Sad]: "😢",
    [PetMood.Tired]: "😴",
    [PetMood.Sick]: "🤒",
    [PetMood.Hungry]: "🍔",
};

type PetProperties = { Hunger: number; Happiness: number; Energy: number };

const STEP = 5;
const clamp = (n: number) => Math.min(100, Math.max(0, n));

function computeMood(p: PetProperties): PetMood {
    if (p.Hunger > 70) return PetMood.Hungry;
    if (p.Energy < 30) return PetMood.Tired;
    if (p.Happiness < 30) return PetMood.Sad;
    if (p.Happiness > 80 && p.Energy > 70) return PetMood.Excited;
    if (p.Happiness > 60) return PetMood.Happy;
    return PetMood.Content;
}

function applyAction(p: PetProperties, action: Action): PetProperties {
    switch (action) {
        case Action.Eat:
            // EAT: riduce Hunger, aumenta Energy
            return { ...p, Hunger: clamp(p.Hunger - STEP), Energy: clamp(p.Energy + STEP) };
        case Action.Play:
            // PLAY: riduce Energy, aumenta Happiness
            return { ...p, Energy: clamp(p.Energy - STEP), Happiness: clamp(p.Happiness + STEP) };
        case Action.Sleep:
            // SLEEP: aumenta Hunger, aumenta Energy
            return { ...p, Hunger: clamp(p.Hunger + STEP), Energy: clamp(p.Energy + STEP) };
    }
}

export const PetGame = () => {
    const [petName, setPetName] = useState("");
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [petProperties, setPetProperties] = useState<PetProperties>({
        Hunger: 0,
        Happiness: 100,
        Energy: 100,
    });

    const mood = computeMood(petProperties);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleAction = (action: Action) => {
        setPetProperties((p) => applyAction(p, action));
    };

    return (
        <div>
            <h1>Digital Pet Game</h1>
            <p>Take care of your virtual companion!</p>

            {!submitted && (
                <div id="first-view">
                    <form onSubmit={handleSubmit}>
                        <input
                            id="pet"
                            type="text"
                            placeholder="Your Pet Name"
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                            required
                        />
                        <button className="submit-btn" type="submit">
                            START GAME
                        </button>
                    </form>
                </div>
            )}

            {submitted && (
                <div id="second-view" className="result-wrap">
                    <div id="name-emoji-actions-container">
                        <h3>{petName}</h3>
                        <h1>
                            {MOOD_EMOJI[mood]} {mood}
                        </h1>

                        <button
                            className="eat-btn"
                            id={`${Action.Eat}-action`}
                            type="button"
                            onClick={() => handleAction(Action.Eat)}
                        >
                            EAT
                        </button>
                        <button
                            className="play-btn"
                            id={`${Action.Play}-action`}
                            type="button"
                            onClick={() => handleAction(Action.Play)}
                        >
                            PLAY
                        </button>
                        <button
                            className="sleep-btn"
                            id={`${Action.Sleep}-action`}
                            type="button"
                            onClick={() => handleAction(Action.Sleep)}
                        >
                            SLEEP
                        </button>
                    </div>

                    <div id="stats-container">
                        <ul>
                            <li>Hunger: {petProperties.Hunger}</li>
                            <li>Happiness: {petProperties.Happiness}</li>
                            <li>Energy: {petProperties.Energy}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};