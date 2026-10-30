const { useState, useEffect } = React;
import type { FormEvent } from "react";

enum PetMood {
    HAPPY = 'Happy',
    EXCITED = 'Excited',
    CONTENT = 'Content',
    SAD = 'Sad',
    TIRED = 'Tired',
    SICK = 'Sick',
    HUNGRY = 'Hungry',
}

const moodEmojis: Record<PetMood, string> = {
    [PetMood.HAPPY]: '😊',
    [PetMood.EXCITED]: '🤩',
    [PetMood.CONTENT]: '🙂',
    [PetMood.SAD]: '😢',
    [PetMood.TIRED]: '😴',
    [PetMood.SICK]: '🤒',
    [PetMood.HUNGRY]: '🍔',
};


export const PetGame = () => {

    const [petName, setPetName] = useState('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [petProperties, setPetProperties] = useState({ Hunger: 0, Happiness: 100, Energy: 100 });
    const [mood, setMood] = useState<PetMood>(PetMood.CONTENT);

    //idle happiness & hunger 
    useEffect(() => {
        if (!submitted) return;
        const timer = setInterval(() => {
            setPetProperties((p) => ({
                ...p,
                Hunger: Math.min(100, p.Hunger + 20),
                Happiness: Math.max(0, p.Happiness - 20),
            }));
        }, 10000);
        return () => clearInterval(timer);
    }, [submitted]);

    //mood (collateral)
    useEffect(() => {
        setMood(computeMood(petProperties));
    }, [petProperties]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem('pet-name') as HTMLInputElement; //read on submit for the tests
        setPetName(input.value);
        setSubmitted(true);
    };

    function computeMood(p: { Hunger: number; Happiness: number; Energy: number }): PetMood {
        if (p.Hunger > 70) return PetMood.HUNGRY;
        if (p.Energy < 30) return PetMood.TIRED;
        if (p.Happiness < 30) return PetMood.SAD;
        if (p.Happiness > 80 && p.Energy > 70) return PetMood.EXCITED;
        if (p.Happiness > 60) return PetMood.HAPPY;
        return PetMood.CONTENT;
    }

    function eat() {
        /**
         * The EAT button should reduce the pets Hunger value, and increase the pets Energy value
         */
        let currentProperties = petProperties;
        let newProperties = {
            Hunger: currentProperties.Hunger == 0 ? 0 : currentProperties.Hunger - 5,
            Happiness: currentProperties.Happiness,
            Energy: currentProperties.Energy == 100 ? 100 : currentProperties.Energy + 5
        }

        setMood(computeMood(newProperties));
        setPetProperties(newProperties);

    }
    function play() {
        /**
         * The PLAY button should reduce the pets Energy value, and increase the pets Happiness value.
         */
        let currentProperties = petProperties;
        let newProperties = {
            Hunger: currentProperties.Hunger,
            Happiness: currentProperties.Happiness == 100 ? 100 : currentProperties.Happiness + 5,
            Energy: currentProperties.Energy == 0 ? 0 : currentProperties.Energy - 5
        }
        setMood(computeMood(newProperties));
        setPetProperties(newProperties);
    }

    function sleep() {
        /**
         * The SLEEP button should increase the pets Hunger value, and increase the pets Energy value.
         */
        let currentProperties = petProperties;
        let newProperties = {
            Hunger: currentProperties.Hunger == 100 ? 100 : currentProperties.Hunger + 5,
            Happiness: currentProperties.Happiness,
            Energy: currentProperties.Energy == 100 ? 100 : currentProperties.Energy + 5
        }
        setMood(computeMood(newProperties));
        setPetProperties(newProperties);
    }

    return (
        <div>
            <h1>Digital Pet Game</h1>
            <p>Take care of your virtual companion!</p>

            {!submitted &&
                <div id="first-view" >
                    <form onSubmit={handleSubmit}>
                        <input id="pet-name" type="text" placeholder="Your Pet Name"
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                            required
                        />

                        <button className="submit-btn" type="submit">START GAME</button>
                    </form>
                </div>

            }

            {submitted &&
                <div id="second-view" className="result-wrap">
                    <div id="name-emoji-actions-container">

                        <h3 className="pet-name">{petName}</h3>
                        <h1>{moodEmojis[mood]}</h1>

                        <button className="eat-btn" id='eat-action'
                            type="button"
                            onClick={(e) => eat()}>EAT</button>
                        <button className="play-btn" id='play-action'
                            type="button"
                            onClick={(e) => play()}>PLAY</button>
                        <button className="sleep-btn" id='sleep-action'
                            type="button"
                            onClick={(e) => sleep()}>SLEEP</button>
                    </div>

                    <div id="stats-container">
                        <ul>
                            <li className="stat">Hunger:
                                <span className="stat-value">{petProperties.Hunger}</span>
                            </li>
                            <li className="stat">Happiness:
                                <span className="stat-value">{petProperties.Happiness}</span>
                            </li>
                            <li className="stat">Energy:
                                <span className="stat-value">{petProperties.Energy}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            }


        </div>
    );
};