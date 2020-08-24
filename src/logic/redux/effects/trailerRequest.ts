import {RAKUTEN_API_CONFIG} from "../utilities/util";
import {IContentExtended} from "../../model/movie_list/IContentExtended";

export function trailerRequest(id: string): Promise<IContentExtended> {
    const body = JSON.stringify({
        audio_language: "SPA",
        audio_quality: "2.0",
        content_id: id,
        content_type: "movies",
        device_serial: "device_serial_1",
        device_stream_video_quality: "FHD",
        player: "web:PD-NONE",
        subtitle_language: "MIS",
        video_type: "trailer"
    });

    return fetch(RAKUTEN_API_CONFIG.getTrailerEndpoint(), {
        method: "POST",
        body
    })
        .then((r: Response) => r.json())
        .then((r: any) => {
            return Promise.resolve(r.data);
        });
}