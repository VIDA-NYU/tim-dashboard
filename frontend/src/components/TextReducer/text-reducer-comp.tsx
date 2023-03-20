import {Box, styled} from "@mui/material";
import {StreamView} from "../StreamDataView/LiveStream";
import {ReasoningOutputsWOZView} from "../StreamDataView/ReasoningOutputsView";
import ReplayPlayer from "../WOZView/video/replay-player";
import {dataType} from "../../api/types";
import Controls from "../Controls";
import Card from "@mui/material/Card";
import React, {ReactElement} from "react";
import {REASONING_CHECK_STREAM} from "../../config";
import {ImageView} from '../WOZView/video/online-image-view';
import ErrorAlert from "../WOZView/common/error-alert";
import RecipeEditor from "./recipe-editor/recipe-editor";
import { Recipe } from "./state/types";
import { TextReducerContext } from "./state/text-reducer-state";


interface TextReducerCompProps {

    recipe: Recipe,
    setRecipe: (newValue: Recipe) => void,

}



const Container = styled("div")({});


export default function TextReducerComp ({recipe, setRecipe}: TextReducerCompProps){

        return (
            <Container>
                <Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                            gap: 1,
                            gridTemplateRows: 'auto',
                            gridTemplateAreas: {
                                md: `
                  "M M M r r r"
                  "M M M r r r"
                  "N N N r r r"
                  "g g g g g g"
                  "g g g g g g"
                  "g g g g g g"
              `,
                                xs: `
                  "H H H H H H"
                  "H H H H H H"
                  "M M M M M M"
                  "M M M M M M"
                  "M M M M M M"
                  "M M M M M M"
                  "g g g g g g"
                  "a a a b b b"
                  "e e e e e e"
                  "c c c d d d"
              `
                            },
                        }}>
                                <Box sx={{gridArea: 'M'}}>
                                     <ImageView streamId='main' boxStreamId='detic:image' confidence={0} debugMode={false}/>
                                </Box>
                                <TextReducerContext.Consumer>
                {({textReducerState, setTextReducerState}) => (
                    <Box sx={{gridArea: 'r'}}>
                    <RecipeEditor
                        recipe={recipe}
                        setRecipe={setRecipe}
                        textReducerState={textReducerState}
                        setTextReducerState={setTextReducerState}
                    />
                </Box>
                )}
            </TextReducerContext.Consumer>
                                
                    </Box>
                </Box>
            </Container>
    )
}


