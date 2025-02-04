
const StoryItem = ({item, onRemoveStory}) => {


    const handleDismiss = () => {
        console.log("Remove Item: " + item.title);
        onRemoveStory(item.objectID);
    };

    // console.log("StoryItem: " + item.title);
    return (
        <li>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
                <button type="button" onClick={handleDismiss}>
                    Dismiss
                </button>
            </span>
        </li>
    );
}

export default StoryItem;