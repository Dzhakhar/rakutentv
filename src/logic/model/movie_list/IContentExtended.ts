import {IContent} from "./IContent";
import {IActor} from "./IActor";

export interface IContentExtended extends IContent {
    actors?: IActor[];
    directors?: IActor[];
    plot?: string;
}