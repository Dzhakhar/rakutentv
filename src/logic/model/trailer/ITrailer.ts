import {IStreamInfo} from "./IStreamInfo";

export interface ITrailer {
    heartbeat: any;
    id: string;
    stream_infos: IStreamInfo[];
    type: string;
}