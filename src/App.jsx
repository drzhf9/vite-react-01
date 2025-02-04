import React from 'react';
import StoryList from './story-list.jsx';
import useStorageState from "./storage-state.jsx";
import InputWithLabel from "./input-with-label.jsx";

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

function App() {

    const [searchTerm, setSearchTerm] = useStorageState('search', '');

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

    React.useEffect(() => {

        if (!searchTerm) return;

        dispatchStories({type: "STORIES_FETCH_INIT"});

        fetch(`${API_ENDPOINT}${searchTerm}`)
            .then(response => response.json())
            .then((result) => {
                dispatchStories({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.hits,
                });
            })
            .catch((err) => {
                console.error(err);
                dispatchStories({type: "STORIES_FETCH_FAILURE"});
            });
    }, [searchTerm])

    const handleSearchChange = (evt) => {
        console.log("Search Changing: " + evt.target.value);
        setSearchTerm(evt.target.value);
    }

    const handleRemoveStory = (id) => {
        dispatchStories({
            type: 'STORIES_REMOVE_ONE',
            payload: id,
        });
    }

    // const searchedStories = stories.data.filter((story) =>
    //     story.title.toLowerCase().includes(searchTerm.toLowerCase()));

    console.log("App Render: " + stories.data.length);
    return (
        <div>
            <h1>My Hacker Stories</h1>

            <InputWithLabel
                id="search"
                value={searchTerm}
                onInputChange={handleSearchChange}
            >
                <strong>Search:</strong>
            </InputWithLabel>

            <hr/>

            {/*<StoryListWithData />*/}

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
