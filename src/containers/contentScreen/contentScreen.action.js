import { CONSTANTS } from "./contentScreen.util";

export const getContentList = (pageNumber) => (dispatch) => {
    import(`../../utils/CONTENTLISTINGPAGE-PAGE${pageNumber}.json`)
        .then(data => {
            dispatch({
                type: CONSTANTS.ACTION_TYPE.RECIEVE_CONTENT_LIST,
                payload: data.default.page["content-items"].content
            })
            // this.setState({ photos: [...this.state.photos, ...data.default.page["content-items"].content] });
        })
};

export const toggleSearchBar = (show) => ({
    type: CONSTANTS.ACTION_TYPE.TOGGLE_SEARCH_BAR,
    payload: show,
})

export const searchContent = (searchKey) => ({
    type: CONSTANTS.ACTION_TYPE.SEARCH_KEY,
    payload: searchKey,
})