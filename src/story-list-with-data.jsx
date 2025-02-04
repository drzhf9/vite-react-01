import {useState} from "react";
// import getAsyncStories from "./module.jsx";
import StoryList from "./story-list.jsx";

const StoryListWithData = () => {

    console.log("StoryListWithData");

    const [stories, setStories] = useState([]);

    const handleRemoveStory = (id) => {
        setStories(stories.filter(storyBook => storyBook.objectID !== id));
    }

    return (
        <StoryList
            list={stories}
            onRemoveStory={handleRemoveStory}
        />
    );
}

export default StoryListWithData;