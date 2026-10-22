const { useState } = React;

export function EventRSVPForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [attendeesNum, setAttendeesNum] = useState(1);
    const [diet, setDiet] = useState('');
    const [guestCheck, setGuestCheck] = useState(false);
    const [submitted, setSubmitted] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const res = {
            msg: 'RSVP Submitted!',
            name,
            email,
            attendeesNum,
            diet: diet || 'None',
            guest: guestCheck ? 'Yes' : 'No',
        };

        console.log(res);
        setSubmitted(res);
    };

    return (
        <div className="form-wrap">
            <h2>Event RSVP Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="section">
                    <label>
                        Name
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <label className="section column">
                    Number of attendees:
                    <input
                        type="number"
                        min="1"
                        value={attendeesNum}
                        onChange={(e) => setAttendeesNum(Number(e.target.value))}
                        required
                    />
                </label>

                <label className="section column">
                    Dietary preferences:
                    <input
                        type="text"
                        placeholder="Dietary preferences (optional)"
                        value={diet}
                        onChange={(e) => setDiet(e.target.value)}
                    />
                </label>

                <label htmlFor="guest">
                    <input
                        type="checkbox"
                        id="guest"
                        name="guest"
                        checked={guestCheck}
                        onChange={(e) => setGuestCheck(e.target.checked)}
                    />
                    Bringing additional guests
                </label>

                <button className="submit-btn" type="submit">
                    Submit
                </button>

                {submitted && (
                    <div className="result-wrap">
                        <h3>{submitted.msg}</h3>
                        <p>Name: {submitted.name}</p>
                        <p>Email: {submitted.email}</p>
                        <p>Number of attendees: {submitted.attendeesNum}</p>
                        <p>Dietary preferences: {submitted.diet}</p>
                        <p>Bringing additional guests: {submitted.guest}</p>
                    </div>
                )}
            </form>
        </div>
    );
}