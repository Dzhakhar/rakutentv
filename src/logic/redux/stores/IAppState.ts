import {IMovieList} from "../../model/movie_list/IMovieList";
import {IContent} from "../../model/movie_list/IContent";
import {ITrailer} from "../../model/trailer/ITrailer";

export interface IAppState {
    data: IMovieList[];
    activeMovie: IContent | undefined;
    trailer: ITrailer | undefined;
}