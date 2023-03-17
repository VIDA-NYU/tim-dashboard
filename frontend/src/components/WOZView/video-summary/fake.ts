import {VideoSummary} from "./types";

export function generateFakeVideoSummary(): VideoSummary{
    let fakeVideoSummary: VideoSummary = {
        events: [
            {
                desc: "new scene",
                timestampValue: 10,
                type: "scene"
            },
            {
                desc: "mug and other tools found",
                timestampValue: 20,
                type: "entity"
            },
            {
                desc: "The user put cupcake into mug",
                timestampValue: 35,
                type: "action"
            },
            {
                desc: "The user whisk",
                timestampValue: 50,
                type: "action"
            }
        ]
    }
    return fakeVideoSummary;
}