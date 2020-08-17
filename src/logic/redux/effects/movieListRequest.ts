import {ListNames, RAKUTEN_API_CONFIG} from "../utilities/util";
import {IMovieList} from "../../model/movie_list/IMovieList";

export function movieListRequest(listName: ListNames): Promise<IMovieList> {
    return fetch(RAKUTEN_API_CONFIG.getListEndpoint(listName))
        .then((r: Response) => r.json())
        .then((r: any) => {
            return Promise.resolve(r.data);
        });
}