import { createSelector } from "reselect";

import { INIT_STATE_NEWS } from "./states";

const selectNews = (state) => state.newsReducer || INIT_STATE_NEWS;

const selectLoading = createSelector(selectNews, (state) => state.isLoading);

const selectDataNews = createSelector(selectNews, (state) => state.news.data);

export { selectDataNews, selectLoading };
