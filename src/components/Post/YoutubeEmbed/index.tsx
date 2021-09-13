import { FC } from "react";
import "./index.css";
interface YoutubeEmbedProps {
    embedId: string;
}

const YoutubeEmbed: FC<YoutubeEmbedProps> = ({ embedId }) => {
    return (
        <div className="container-video my-8">
            <iframe
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                className="video"
            />
        </div>
    );
};

export default YoutubeEmbed;
