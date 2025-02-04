import StoryItem from "./story-item.jsx";

const StoryList = ({list, onRemoveStory}) => {
    console.log("StoryList: " + list.length);
    return (
        <ul>
            {list.map((item) => (
                <StoryItem
                    key={item.objectID}
                    item={item}
                    onRemoveStory={onRemoveStory}
                />
            ))}
        </ul>
    );
};

export default StoryList;
