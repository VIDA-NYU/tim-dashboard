// Template code for a functional component TextReducerComp with the interface of the props
// and the default values for the props.
// 

import React from 'react';
import { TextReducerContext, TextReducerStateProvider } from './state/text-reducer-state';
import TextReducerDataConsumer from './text-reducer-data-consumer';

interface TextReducerViewProps {}

const TextReducerView: React.FC<TextReducerViewProps> = (props: TextReducerViewProps) => {
    return (
        <TextReducerStateProvider>
            <TextReducerContext.Consumer>
                {({textReducerState, setTextReducerState}) => (
                    <TextReducerDataConsumer
                        textReducerState={textReducerState}
                        setTextReducerState={setTextReducerState}
                    />
                )}
            </TextReducerContext.Consumer>
        </TextReducerStateProvider>
    )
};

export default TextReducerView;