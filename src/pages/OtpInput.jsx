import { useRef, useEffect, useState } from "react";

export default function OtpInput() {
  const otpLength = 4;

  // State to store OTP digits as an array
  const [otp, setOtp] = useState(Array(otpLength).fill(""));

  // Ref to store input elements
  const inputRefs = useRef([]);

  // Focus the first input on component mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle value change for each OTP input
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only a single numeric digit (0–9)
    if (!/^[0-9]?$/.test(value)) return;

    // Prevent entering value if previous input is empty (sequential rule)
    if (index > 0 && otp[index - 1] === "") return;

    // Create a copy of current OTP
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move focus to next input if value is entered
    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace behavior
  const handleKeyDown = (e, index) => {
    // If current input is empty and backspace is pressed,
    // move focus to the previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Prevent clicking on inputs out of sequence
  const handleClick = (index) => {
    // Allow click only if all previous fields are filled
    for (let i = 0; i < index; i++) {
      if (otp[i] === "") {
        inputRefs.current[i].focus();
        return;
      }
    }
  };

  // Check if all OTP fields are filled
  const isOtpComplete = otp.every((digit) => digit !== "");

  // Handle OTP submission
  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    console.log("Submitted OTP:", enteredOtp);

    // Example: API call can be triggered here
    // verifyOtp(enteredOtp);
  };

  return (
    <>
      <h3>Validate OTP</h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => handleClick(index)} // Enforce sequential clicking
            style={{
              width: "50px",
              height: "50px",
              textAlign: "center",
              fontSize: "18px",
              cursor:
                index === 0 || otp[index - 1] !== ""
                  ? "text"
                  : "not-allowed",
            }}
          />
        ))}
      </div>

      {/* Submit button enabled only when OTP is complete */}
      <button
        onClick={handleSubmit}
        disabled={!isOtpComplete}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: isOtpComplete ? "pointer" : "not-allowed",
        }}
      >
        Submit OTP
      </button>
    </>
  );
}
