import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './voicenav.scss'
import { Mic, AudioLines } from "lucide-react";
export default function VoiceNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const recognitionRef = useRef(null);
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [lastHeard, setLastHeard] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      console.log("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";          // change to "hi-IN" for Hindi
    recognition.continuous = true;       // keep listening
    recognition.interimResults = false;  // only final results

    recognition.onstart = () => {
      setListening(true);
      console.log("Voice listening started");
    };

    recognition.onend = () => {
      setListening(false);
      console.log("Voice listening stopped");
    };

    recognition.onerror = (e) => {
      console.log("Speech error:", e.error);
    };

    recognition.onresult = (event) => {
      const last = event.results[event.results.length - 1];
      const text = last[0].transcript.trim();
      const normalized = text.toLowerCase();

      // Logging
      console.log("Heard:", text);
      console.log("Current route:", location.pathname);

      setLastHeard(text);

      // Commands -> Navigation
      if (normalized.includes("login")) {
        console.log("Command: go to /login");
        navigate("/");
      } else if (normalized.includes("sign up") || normalized.includes("signup") || normalized.includes("register")) {
        console.log("Command: go to /signup");
        navigate("/Signup");
      } else if (normalized.includes("home")) {
        console.log("Command: go to /");
        navigate("/");
      } else if (normalized.includes("mandi")) {
        console.log("Command: go to /mandi");
        navigate("/mandi");
      } else if (normalized.includes("auction") || normalized.includes("auctions")) {
        console.log("Command: go to /auctions");
        navigate("/auctions");
      } else if (normalized.includes("back")) {
        console.log("Command: back");
        navigate(-1);
      } else {
        console.log("❓ No matching command for:", text);
      }
    };

    recognitionRef.current = recognition;

    // Cleanup
    return () => {
      recognition.stop();
    };
  }, [navigate, location.pathname]);

  const start = () => recognitionRef.current?.start();
  const stop = () => recognitionRef.current?.stop();

  if (!supported) {
    return (
      <div style={{ padding: 12 }}>
        Voice navigation not supported on this browser.
        Try Chrome/Edge.
      </div>
    );
  }

  return (
    <div className="voicenav-wrapper">
      <button className="voice-btn" onClick={listening ? stop : start}>
        {listening ? <AudioLines /> : <Mic/>}
      </button>


    {/*
    <div style={{ fontSize: 14 }}>
        <div><b>Status:</b> {listening ? "Listening..." : "Off"}</div>
        <div><b>Last heard:</b> {lastHeard || "-"}</div>
      </div>
    */ }
      
    </div>
  );
}
