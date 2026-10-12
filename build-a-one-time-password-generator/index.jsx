const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
    const [code, setCode] = useState(null);
    const [codeStatus, setCodeStatus] = useState("init");
    const [timeoutVal, setTimeoutVal] = useState(5);

    let message = "";
    if (codeStatus === "expired") message = "OTP expired. Click the button to generate a new OTP.";
    if (codeStatus === "valid") message = "Expires in: " + timeoutVal + " seconds";


    const handleCodeGeneration = () => {
        setCode(Math.floor(Math.random() * 899999 + 100000).toString());
        setCodeStatus("valid");
        setTimeoutVal(5);
    };

    useEffect(() => {
        if (codeStatus !== "valid") return;
        if (timeoutVal === 0) {
            setCodeStatus("expired");
            return;
        }


        const timeoutId = setTimeout(() => {
            setTimeoutVal(timeoutVal - 1);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [timeoutVal, codeStatus]);

    return (
        <div className="container">
            <h1 id="otp-title">OTP Generator</h1>

            <h2 id="otp-display">
                {codeStatus !== "valid" ? "Click 'Generate OTP' to get a code" : code}</h2>

            <p id="otp-timer" aria-live="polite">{message}</p>

            <button id="generate-otp-button" disabled={codeStatus === "valid"} onClick={handleCodeGeneration}>Generate OTP</button>
        </div>
    );
};