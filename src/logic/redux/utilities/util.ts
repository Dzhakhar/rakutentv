export const RAKUTEN_API_CONFIG = {
    QUERY_PARAMS: "?classification_id=5&device_identifier=web&locale=es&market_code=es",
    HOST: `http://ec2-15-188-239-164.eu-west-3.compute.amazonaws.com/https://gizmo.rakuten.tv`,
    getListEndpoint: function (listName: ListNames) {
        return `${this.HOST}/v3/lists/${listName}${this.QUERY_PARAMS}`;
    },
    getContentsEndpoint: function (listName: ListNames, page: number = 1) {
        return `${this.HOST}/v3/lists/${listName}/contents${this.QUERY_PARAMS}&page=${page}`
    },
    getMovieEndpoint: function (id: string) {
        return `${this.HOST}/v3/movies/${id}${this.QUERY_PARAMS}`;
    },
    getTrailerEndpoint: function () {
        return `${this.HOST}/v3/me/streamings${this.QUERY_PARAMS}`;
    }
};

export enum ListNames {
    POPULARS = "populares-en-taquilla",
    FAMILY_PREMIERS = "estrenos-para-toda-la-familia",
    POPULAR_PREMIERS = "estrenos-imprescindibles-en-taquilla",
    SPAIN_PREMIERS = "estrenos-espanoles",
    IF_YOU_LOST = "si-te-perdiste",
    SPECIAL_X_MEN = "especial-x-men",
    FAVOURITES_OF_WEEK = "nuestras-preferidas-de-la-semana"
}