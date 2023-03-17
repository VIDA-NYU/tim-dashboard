import sample from "./sample.png"
interface VideoSummaryEventImageViewProps {

}

export default function VideoSummaryEventImageView({}: VideoSummaryEventImageViewProps){
    return (
        <div>
            <img src={sample} width={256} height={256}></img>
        </div>
    )
}