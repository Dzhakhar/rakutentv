import {IScoreSite} from "./IScoreSite";

export interface IHighlightedScore {
    amount_of_votes?: number;
    formatted_amount_of_votes?: string;
    score?: number;
    site?: IScoreSite;
}