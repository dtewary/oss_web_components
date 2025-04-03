import React, { useState, useRef, useEffect } from "react";

/**
 * InputOTP component for one-time password input
 * @param {Object} props - Component props
 * @param {number} props.length - Number of digits in the OTP
 * @param {function} props.onChange - Function to call when OTP changes
 * @param {function} props.onComplete - Function to call when all digits are filled
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {string} props.className - Additional classes for the container
 * @returns {JSX.Element}
 */
const InputOTP = ({
  length = 6,
  onChange,
  onComplete,
  disabled = false,
  className = "",
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  // Initialize input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Handle input change
  const handleChange = (e, index) => {
    const { value } = e.target;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    // Update OTP state
    const newOtp = [...otp];
    
    // Take only the last character if multiple characters are pasted
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    
    // Call onChange with the updated OTP
    if (onChange) {
      onChange(newOtp.join(""));
    }
    
    // Move to next input if current input is filled
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
    
    // Call onComplete if all digits are filled
    if (newOtp.every(digit => digit !== "") && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  // Handle key down events
  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    // Move to next input on arrow right
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
    
    // Move to previous input on arrow left
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    // Only allow numbers
    if (!/^\d*$/.test(pastedData)) return;
    
    // Fill OTP fields with pasted data
    const newOtp = [...otp];
    for (let i = 0; i < Math.min(pastedData.length, length - index); i++) {
      newOtp[index + i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Call onChange with the updated OTP
    if (onChange) {
      onChange(newOtp.join(""));
    }
    
    // Focus on the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((digit, i) => digit === "" && i >= index);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus();
    } else {
      inputRefs.current[length - 1].focus();
    }
    
    // Call onComplete if all digits are filled
    if (newOtp.every(digit => digit !== "") && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          disabled={disabled}
          className={`
            w-12 h-12
            text-center
            text-xl
            os-medium
            text-brand-blackLight
            border-2
            rounded-md
            focus:border-brand-green
            focus:outline-none
            transition-colors
            ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white"}
          `}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default InputOTP;
