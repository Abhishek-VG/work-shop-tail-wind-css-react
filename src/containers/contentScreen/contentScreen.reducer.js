import { CONSTANTS } from "./contentScreen.util";

const INITIAL_STATE = {
    searchKey: "",
    listOfContents: [],
    isSearchBarVisible: false
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CONSTANTS.ACTION_TYPE.RECIEVE_CONTENT_LIST: return {
            ...state,
            listOfContents: [
                ...state.listOfContents,
                ...action.payload
            ]
        }

        case CONSTANTS.ACTION_TYPE.SEARCH_KEY: return {
            ...state,
            searchKey: action.payload
        }


        case CONSTANTS.ACTION_TYPE.TOGGLE_SEARCH_BAR: return {
            ...state,
            isSearchBarVisible: action.payload
        }

        default: return state;
    }
}