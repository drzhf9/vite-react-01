import * as React from 'react';
import StoryItem from "./story-item.jsx";

const StoryList = React.memo(
    ({list, onRemoveStory}) => (
        console.log("B:List " + list.length) ||
        (
            <ul>
                {list.map((item) => (
                    <StoryItem
                        key={item.objectID}
                        item={item}
                        onRemoveStory={onRemoveStory}
                    />
                ))}
            </ul>
        )
    )
);

StoryList.displayName = "StoryList";

export default StoryList;
