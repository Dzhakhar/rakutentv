import {IContents} from "./IContents";
import {ListNames} from "../../redux/utilities/util";

export interface IMovieList {
    contents?: IContents;
    content_type?: string;
    category?: string;
    id?: ListNames;
    is_b2b?: boolean;
    is_recommendation?: boolean;
    kind?: string;
    name?: string;
    numerical_id?: number;
    only_coupon?: boolean;
    short_name?: string;
    type?: string;
    wktv_code?: string;
}
