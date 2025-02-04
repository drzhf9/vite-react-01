import {StyledButtonSmall, StyledColumn, StyledItem} from "./app-styled-components.jsx";

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
                    Dismiss
                </StyledButtonSmall>
            </StyledColumn>
        </StyledItem>
    );
}

export default StoryItem;