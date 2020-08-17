import {ListNames, RAKUTEN_API_CONFIG} from "../utilities/util";
import {IContents} from "../../model/movie_list/IContents";

export function contentsRequest(listName: ListNames, page: number): Promise<IContents> {
    return fetch(RAKUTEN_API_CONFIG.getContentsEndpoint(listName, page))
        .then((r: Response) => r.json())
        .then((contents: IContents) => {
            return Promise.resolve(contents);
        });
}