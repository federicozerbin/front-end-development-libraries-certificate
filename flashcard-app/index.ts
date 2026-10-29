interface FlashCard {
    questionText: string,
    questionAnswer: string
}

let currentCards: FlashCard[] = [];

const flashcardEl = document.getElementById("flashcard") as HTMLDivElement;
const questionEl = document.getElementById("card-question") as HTMLParagraphElement;
const answerEl = document.getElementById("card-answer") as HTMLParagraphElement;
const entryForm = document.getElementById("entry-form") as HTMLFormElement;
const frontInput = document.getElementById("front-text") as HTMLTextAreaElement;
const backInput = document.getElementById("back-text") as HTMLTextAreaElement;

function displayCurrentCard(): void {
    flashcardEl.classList.remove("flipped");
    const card = currentCards[currentCards.length - 1];
    if (card) {
        questionEl.textContent = card.questionText;
        answerEl.textContent = card.questionAnswer;
    } else {
        questionEl.textContent = "Nessuna carta disponibile";
        answerEl.textContent = "";
    }
}

function checkFlipped(): void {
    flashcardEl.classList.toggle("flipped");
}

function deleteCard(): void {
    currentCards.pop();
    displayCurrentCard();
}

class InvalidUserInputError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidUserInputError";
        Object.setPrototypeOf(this, InvalidUserInputError.prototype);
    }
}

entryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const question = frontInput.value.trim();
    const answer = backInput.value.trim();

    if (question === "" || answer === "") {
        throw new InvalidUserInputError("Domanda e risposta non possono essere vuote.");
    }

    currentCards.push({ questionText: question, questionAnswer: answer });
    displayCurrentCard();
    entryForm.reset();
});

displayCurrentCard();