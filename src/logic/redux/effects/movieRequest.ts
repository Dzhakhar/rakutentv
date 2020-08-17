import {RAKUTEN_API_CONFIG} from "../utilities/util";
import {IContentExtended} from "../../model/movie_list/IContentExtended";

export function singleMovieRequest(id: string): Promise<IContentExtended> {
    return fetch(RAKUTEN_API_CONFIG.getMovieEndpoint(id))
        .then((r: Response) => r.json())
        .then((r: any) => {
            return Promise.resolve(r.data);
        });
}