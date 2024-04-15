import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [rescentPrompt, setRescentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ResultData, setResultData] = useState("");

    const delayPare = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 50 * index);
    };
    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }
    const onSet = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRescentPrompt(prompt);
        } else {
            setPrevPrompt((prev) => [...prev, input]);
            setRescentPrompt(input);
            response = await runChat(input);
        }

        let responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        const responseWithoutStars = newResponse.split("*").join(" ");
        const responseArrayDelay = responseWithoutStars.split(" ");

        responseArrayDelay.forEach((word, index) => {
            delayPare(index, word + " ");
        });

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompt,
        onSet,
        input,
        loading,
        rescentPrompt,
        showResult,
        ResultData,
        setInput,
        setRescentPrompt,
        setPrevPrompt,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
