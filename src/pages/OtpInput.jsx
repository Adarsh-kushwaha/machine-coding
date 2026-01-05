import { useRef, useEffect, useState } from "react";

export default function OtpInput() {
  const otpLength = 6;
  const regex = /^[0-9]?$/;

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
    if (!regex.test(value)) {
      return;
    }

    if (index > 0 && inputRefs.current[index - 1].value === "") {
      // inputRefs.current[index]?.blur();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    //move to next input
    if (index < otp.length - 1 && value) {
      inputRefs.current[index + 1].focus();
    }

    if (index === otp.length - 1) {
      inputRefs.current[index].blur();
    }

    console.log(otp);
  };

  // Handle backspace behavior
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Prevent clicking on inputs out of sequence
  const handleClick = (index) => {
    if (index > 0 && inputRefs.current[index - 1].value === "") {
      inputRefs.current[index]?.blur();
      return;
    }
  };

  // Check if all OTP fields are filled
  const isOtpComplete = otp.every((digit) => digit !== "");

  // Handle OTP submission
  const handleSubmit = () => {
    console.log("My otp", otp.join(""))
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
                index === 0 || otp[index - 1] !== "" ? "text" : "not-allowed",
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
