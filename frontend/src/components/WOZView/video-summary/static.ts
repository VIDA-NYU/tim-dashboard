import {VideoSummary} from "./types";
import summaryJsonFile from "./static/mugcake-v1.json";

export function generateStaticVideoSummary(): VideoSummary{
    let staticVideoSummary: VideoSummary = summaryJsonFile as VideoSummary;
    // let fakeVideoSummary: VideoSummary = {
    //     events: [
    //         {
    //             desc: "new scene",
    //             timestampValue: 10,
    //             type: "scene"
    //         },
    //         {
    //             desc: "mug and other tools found",
    //             timestampValue: 20,
    //             type: "entity"
    //         },
    //         {
    //             desc: "add the flour to the bowl",
    //             timestampValue: 35,
    //             type: "action"
    //         },
    //         {
    //             desc: "The user whisk",
    //             timestampValue: 50,
    //             type: "action"
    //         }
    //     ]
    // }
    return staticVideoSummary;
}