import {IClassification} from "./IClassification";
import {IContentImages} from "./IContentImages";
import {IHighlightedScore} from "./IHighlightedScore";
import {ILabels} from "./ILabels";
import {IRating} from "./IRating";

export interface IContent {
    classification?: IClassification;
    duration?: number;
    highlighted_score?: IHighlightedScore;
    id?: string;
    images?: IContentImages;
    label?: string;
    labels?: ILabels;
    numerical_id?: number;
    rating?: IRating;
    title?: string;
    type?: string;
    year?: number;
}