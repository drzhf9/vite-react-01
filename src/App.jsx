import * as React from 'react';
import StoryList from './story-list.jsx';
import useStorageState from "./storage-state.jsx";
import InputWithLabel from "./input-with-label.jsx";
import axios from "axios";

import styles from './App.module.css';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

function App() {

    const [searchTerm, setSearchTerm] = useStorageState('search', '');

    const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        setUrl(`${API_ENDPOINT}${searchTerm}`);
        event.preventDefault();
    };

    const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}) => {
        return (
            <form onSubmit={onSearchSubmit} className="search-form">
                <InputWithLabel
                    id="search"
                    value={searchTerm}
                    isFocused
                    onInputChange={onSearchInput}
                >
                    <strong>Search:</strong>
                </InputWithLabel>
                &nbsp;
                <button type="submit" disabled={!searchTerm} className="button button_large">
                    Submit
                </button>
            </form>
        );
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
                    data: action.payload,
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
        {data: [], isLoading: false, isError: false}
    );

    const handleFetchStories = React.useCallback( async () => {

        dispatchStories({type: "STORIES_FETCH_INIT"});

        try {
            const result = await axios.get(url);

            dispatchStories({
                type: "STORIES_FETCH_SUCCESS",
                payload: result.data.hits,
            });
        }
        catch(err) {
            console.error(err);
            dispatchStories({type: "STORIES_FETCH_FAILURE"});
        }
    }, [url]);

    React.useEffect(() => {
        handleFetchStories()
    }, [handleFetchStories]);

    const handleRemoveStory = (id) => {
        dispatchStories({
            type: 'STORIES_REMOVE_ONE',
            payload: id,
        });
    }

    console.log("App Render: " + stories.data.length);
    return (
        <div className={styles.container}>

            <h1 className={styles.headlinePrimary}>My Story Searcher</h1>

            <SearchForm
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
            />

            {/*<hr/>*/}

            {stories.isError && <p>Something went wrong!</p>}

            {stories.isLoading
                ? (<p>Loading ...</p>)
                : (<StoryList
                    list={stories.data}
                    onRemoveStory={handleRemoveStory}
                />)
            }
        </div>
    );
}

export default App;
