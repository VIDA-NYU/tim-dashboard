import {createContext, useState, useContext, useMemo} from "react";
import {createDefaultTextReducerState} from "./utils";
import {TextReducerProviderState, TextReducerState} from "./types";

export const TextReducerContext = createContext<TextReducerProviderState>(
    {
        textReducerState: createDefaultTextReducerState(),
        setTextReducerState: (newValue) => {},
    });

// export const useTextReducerContext = () => useContext(TextReducerContext);

export const TextReducerStateProvider = ({ children }) => {

    const defaultValue = useMemo(() => createDefaultTextReducerState(), []);

    const [textReducerState, setTextReducerState] = useState<TextReducerState>(defaultValue);

    let textReducerProviderState: TextReducerProviderState = {
        textReducerState: textReducerState,
        setTextReducerState: setTextReducerState,
    };
    return (
        <TextReducerContext.Provider value={textReducerProviderState}>
            {children}
        </TextReducerContext.Provider>
    );
};

