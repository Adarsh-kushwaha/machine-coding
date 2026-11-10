/*
  OTP INPUT — HOW TO APPROACH
  ---------------------------
  1. Keep the OTP as an array in state: ["", "", "", ""] (one slot per box).
  2. Render one <input> per slot using otp.map().
  3. Store a ref to EVERY input in one array ref, so we can move focus by index.
  4. Handle 3 events:
       - onChange  -> put the digit in, jump to the next box
       - onKeyDown -> Backspace goes back, Arrow keys move left/right
       - onPaste   -> spread the pasted digits across all boxes
  5. When every box is filled, call onOtpComplete with the joined string.
*/

import { useRef, useState, useEffect } from "react";
import "./otpStyles.css";

export const OtpComponent = ({ count, onOtpComplete }) => {
    // One string per box. Array(count).fill("") -> ["", "", "", ""]
    const [otp, setOtp] = useState(Array(count).fill(""));

    /*
      ⭐ GOTCHA / MOST IMPORTANT PART ⭐
      ---------------------------------
      We need to move focus between boxes (next box, previous box).
      Focus is a DOM thing, state can't do it — so we need refs.

      But we have MANY inputs, not one. So instead of creating
      useRef() 4 times, we create ONE ref holding an ARRAY:

          inputRef.current = [input0, input1, input2, input3]

      Each input puts itself into this array using a "callback ref"
      (see the JSX below: ref={(el) => inputRef.current[index] = el}).

      Then anywhere we can do:
          inputRef.current[index + 1].focus()  -> go to next box
          inputRef.current[index - 1].focus()  -> go to previous box

      Why useRef and not useState?
        - Changing a ref does NOT re-render.
        - The value survives across re-renders.
    */
    const inputRef = useRef([]);

    // Runs when user types in a box
    function handleChange(e, index) {
        const value = e.target.value;

        if (!/^\d?$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < count - 1) {
            inputRef.current[index + 1].focus();
        }

        if (updatedOtp.every((digit) => digit !== "")) {
            onOtpComplete(updatedOtp.join(""));
        }

    }

    // Handles special keys: Backspace and Arrow keys
    function handleKeyDown(e, index) {
        const key = e.key;

        if (key === "Backspace") {
            e.preventDefault();
            const updatedOtp = [...otp];
            if (otp[index]) {
                updatedOtp[index] = "";
                setOtp(updatedOtp);
            } else if (index > 0) {
                console.log("backspacepress", index);
                inputRef.current[index - 1].focus();
            }
        }

        // Right arrow -> next box (if not last)
        if (key === "ArrowRight" && index + 1 < count) {
            inputRef.current[index + 1].focus();
        }

        // Left arrow -> previous box (if not first)
        if (key === "ArrowLeft" && index > 0) {
            inputRef.current[index - 1].focus();
        }
    }

    // User pastes full OTP like "1234" -> fill all boxes at once
    function handlePaste(e) {
        e.preventDefault();
        let pastedValue = e.clipboardData.getData("text").trim();

        if (!/^\d+$/.test(pastedValue)) {
            return;
        }

        const digits = pastedValue.slice(0, count).split("");
        const updatedOtp = Array(count).fill("");

        digits.forEach((digit, index) => {
            updatedOtp[index] = digit;
        });

        setOtp(updatedOtp);

        if (digits.length === count) {
            onOtpComplete(updatedOtp.join(""));
        }
    }

    return (
        <div className="otp-container">
            {otp.map((digit, index) => (
                <input
                    // ⭐ Callback ref: React calls this with the DOM element.
                    // We save it at position `index` in our ref array.
                    ref={(iRef) => {
                        inputRef.current[index] = iRef;
                    }}
                    key={index}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otpInput"
                    // Controlled input: value always comes from state
                    value={digit ?? ""}
                    onChange={(e) => handleChange(e, index)}
                    onPaste={handlePaste}
                    // Cursor starts in the first box on load
                    autoFocus={index===0}
                />
            ))}
        </div>
    );
};
