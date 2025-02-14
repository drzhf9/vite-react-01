import * as React from 'react';
import {StyledButtonSmall, StyledColumn, StyledItem} from "./app-styled-components.jsx";
import Check from './assets/check.svg?react';

const StoryItem = ({item, onRemoveStory}) => {

    const handleDismiss = () => {
        console.log("Remove Item: " + item.title);
        onRemoveStory(item.objectID);
    };

    // console.log("StoryItem: " + item.title);
    return (
        <StyledItem>
            <StyledColumn width='50%'><a href={item.url}>{item.title}</a></StyledColumn>
            <StyledColumn width='20%'>{item.author}</StyledColumn>
            <StyledColumn width='10%'>{item.num_comments}</StyledColumn>
            <StyledColumn width='10%'>{item.points}</StyledColumn>
            <StyledColumn width='10%'>
                <StyledButtonSmall onClick={handleDismiss}>
                    <Check height="18px" width="18px" />
                </StyledButtonSmall>
            </StyledColumn>
        </StyledItem>
    );
}

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


export default StoryList;
