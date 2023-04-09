import { useState, useEffect } from 'react';
import Button from "./Button"

export default function App() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [prevTime, setPrevTime] = useState("00:00:00");

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleRefresh = () => {
        setIsRunning(false)
        setSeconds(0);
    };

    const handleTour = () => {
        setIsRunning(false)
        setSeconds(0);
        setPrevTime(formatTime(seconds + parseInt(prevTime.split(":")[0]) * 3600 + parseInt(prevTime.split(":")[1]) * 60 + parseInt(prevTime.split(":")[2])))
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    const remainingTime = () => {
        const ms = new Date("2023-06-17 10:15:00").getTime() - new Date().getTime()

        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return `${days} Gün, ${hours} Saat`;
    }

    return (
        <main>
            <h1 style={{ fontSize: "128px", lineHeight: "128px" }}>{formatTime(seconds)}</h1>
            <h1 style={{ marginBottom: "32px", color: "#626262" }}>{prevTime}</h1>
            <div className="btn-container">
                {isRunning ?
                    <Button func={handleStop} icon={<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="64px" width="64px" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect></svg>} /> :
                    <Button func={handleStart} icon={<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="64px" width="64px" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>} />
                }
                <Button style={{ backgroundColor: "#8fb309", color: "black" }} func={handleTour} icon={<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="56px" width="56px" xmlns="http://www.w3.org/2000/svg"><path d="M19 4H6V2H4v18H3v2h4v-2H6v-5h13a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 9H6V6h12v7z"></path></svg>} />
                <Button style={{ backgroundColor: "#2d55f2", color: "white" }} func={handleRefresh} icon={<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="48px" width="48px" xmlns="http://www.w3.org/2000/svg"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>} />
            </div>
            <h1 style={{ marginTop: "32px", color: "#626262" }}>{remainingTime()}</h1>
        </main>
    );
}
