interface VideoSummaryEvent{
    desc: string,
    timestampValue: number,
    type: "action" | "scene" | "entity"
}

interface VideoSummary {
    events: Array<VideoSummaryEvent>
}

export type {VideoSummaryEvent, VideoSummary}