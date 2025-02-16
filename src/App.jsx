import * as React from 'react';
import {StyledContainer, StyledHeadlinePrimary} from "./app-styled-components.jsx";
import useStorageState from "./storage-state.jsx";
import StoryList from './story-list.jsx';
import SearchForm from "./search-form.jsx";
import axios from "axios";

// const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const getSumComments = (stories) => {
    console.log("C: " + stories.data.length);
    return stories.data.reduce(
        (result, value) => result + value.num_comments, 0
    );
};

const getUrl = (searchTerm, page) =>
    `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const extractSearchTerm = (url) =>
    url.substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
    .replace(PARAM_SEARCH, '');

// const getLastSearches = (urls) => urls.slice(-6).slice(0, -1).map(extractSearchTerm);
const getLastSearches = (urls) =>
    urls.reduce((result, url, index) => {
        const searchTerm = extractSearchTerm(url);
        if (index === 0) {
            return result.concat(searchTerm);
        }
        const previousSearchTerm = result[result.length - 1];
        if (searchTerm === previousSearchTerm) {
            return result;
        } else {
            return result.concat(searchTerm);
        }
    }, [])
        .slice(-6)
        .slice(0, -1);

function App() {
    const [searchTerm, setSearchTerm] = useStorageState('search', '');

    const [urls, setUrls] = React.useState([getUrl(searchTerm, 0)]);

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleMore = () => {
        const lastUrl = urls[urls.length - 1];
        const searchTerm = extractSearchTerm(lastUrl);
        handleSearch(searchTerm, stories.page + 1);
    };

    const handleSearch = (searchTerm, page) => {
        const url = getUrl(searchTerm, page);
        setUrls(urls.concat(url));
    };

    const handleSearchSubmit = (event) => {
        handleSearch(searchTerm, 0);
        event.preventDefault();
    };

    const storiesReducer = (state, action) => {

        switch (action.type) {
            case 'STORIES_FETCH_INIT':
                return {
                    ...state,
                    isLoading: true,
                    isError: false,
                };

            case 'STORIES_FETCH_SUCCESS':
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    data:
                        action.payload.page === 0
                            ? action.payload.list
                            : state.data.concat(action.payload.list),
                    page: action.payload.page,
                };

            case 'STORIES_FETCH_FAILURE':
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                };

            case 'STORIES_REMOVE_ONE':
                return {
                    ...state,
                    data: state.data.filter((story) => story.objectID !== action.payload)
                };

            default:
                throw new Error(`Unknown action type ${action.type}`);

        }
    }

    const [stories, dispatchStories] = React.useReducer(
        storiesReducer,
        {data: [], page: 0, isLoading: false, isError: false}
    );

    const handleFetchStories = React.useCallback( async () => {

        dispatchStories({type: "STORIES_FETCH_INIT"});

        try {
            const lastUrl = urls[urls.length - 1];
            const result = await axios.get(lastUrl);

            dispatchStories({
                type: "STORIES_FETCH_SUCCESS",
                payload: {
                    list: result.data.hits,
                    page: result.data.page,
                },
            });
        }
        catch(err) {
            console.error(err);
            dispatchStories({type: "STORIES_FETCH_FAILURE"});
        }
    }, [urls]);

    React.useEffect(() => {
        handleFetchStories();
    }, [handleFetchStories]);

    const handleRemoveStory = React.useCallback(
        (id) => {
        dispatchStories({
            type: 'STORIES_REMOVE_ONE',
            payload: id,
        });
    }, [] );

    const sumComments = React.useMemo(
        () => getSumComments(stories),
        [stories]
    );

    const handleLastSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        handleSearch(searchTerm, 0);
    };

    const lastSearches = getLastSearches(urls);

    console.log("B:App " + stories.data.length);

    return (
        <StyledContainer>

            <StyledHeadlinePrimary>My Hacker Stories with {sumComments} comments.</StyledHeadlinePrimary>

            <SearchForm
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
            />


            {lastSearches.map((searchTerm, index) => (
               <button key={searchTerm + index}
                       type="button"
                       onClick={ () => handleLastSearch(searchTerm) }
               >
                   {searchTerm}
               </button>
            ))}

            {stories.isError && <p>Something went wrong!</p>}

            <StoryList
                list={stories.data}
                onRemoveStory={handleRemoveStory}
            />

            {stories.isLoading
                ? (<p>Loading ...</p>)
                : (<button type="button" onClick={handleMore}>
                        More
                    </button>
                )
            }
        </StyledContainer>
    );
}

export default App;
