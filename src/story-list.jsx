import * as React from 'react';
import {StyledButtonSmall, StyledColumn, StyledItem} from "./app-styled-components.jsx";
import Check from './assets/check.svg?react';
import { sortBy } from "lodash";

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

const SORTS = {
    NONE:       (list) => list,
    TITLE:      (list) => sortBy(list, 'title'),
    AUTHOR:     (list) => sortBy(list, 'author'),
    COMMENT:    (list) => sortBy(list, 'num_comments').reverse(),
    POINT:      (list) => sortBy(list, 'points').reverse(),
};

const StoryList = React.memo(
    ({list, onRemoveStory}) => {
        console.log("B:List " + list.length);

        const [sort, setSort] = React.useState({
            sortKey: "NONE",
            isReserse: false
        });

        const handleSort = (sortKey) => {
            const isReserse = sort.sortKey === sortKey && !sort.isReserse;
            setSort({sortKey, isReserse});
        };

        const sortFunction = SORTS[sort.sortKey];

        const sortedList = sort.isReserse
            ? sortFunction(list).reverse()
            : sortFunction(list);

        return (
            <ul>
                <li style={{display: "flex", justifyContent: "space-between"}}>
                    <span style={{width: "50%"}}><button type="button" onClick={ ()=> handleSort('TITLE') }>Title</button></span>
                    <span style={{width: "20%"}}><button type="button" onClick={ () => handleSort('AUTHOR')}>Author</button></span>
                    <span style={{width: "10%"}}><button type="button" onClick={ () => handleSort('COMMENT') }>Comments</button></span>
                    <span style={{width: "10%"}}><button type="button" onClick={ () => handleSort('POINT') }>Points</button></span>
                    <span style={{width: "10%"}}>Actions</span>
                </li>

                {sortedList.map((item) => (
                    <StoryItem
                        key={item.objectID}
                        item={item}
                        onRemoveStory={onRemoveStory}
                    />
                ))}
            </ul>
        );
    }
);


export default StoryList;
