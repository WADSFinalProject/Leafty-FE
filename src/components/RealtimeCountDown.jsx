import React, { useState, useEffect } from "react";

function RealTimeCountDown({ collectedDate, expiredDate }) {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            // Get the current time
            const now = new Date().getTime();
            // Get the expiry time in milliseconds
            const expiryTime = new Date(expiredDate).getTime();

            // Calculate the difference in milliseconds
            const diff = expiryTime - now;

            if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft({ hours, minutes, seconds });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft(); // Initial call
        const interval = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(interval);
    }, [expiredDate]);

    return (
        
        <span className="countdown font-montserrat text-2xl">
            <span style={{ "--value": timeLeft.hours }}></span>h
            <span style={{ "--value": timeLeft.minutes }}></span>m
            <span style={{ "--value": timeLeft.seconds }}></span>s
        </span>
    );
}

export default RealTimeCountDown;
