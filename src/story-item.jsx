import itemStyles from './App.module.css';

const StoryItem = ({item, onRemoveStory}) => {

    const handleDismiss = () => {
        console.log("Remove Item: " + item.title);
        onRemoveStory(item.objectID);
    };

    // console.log("StoryItem: " + item.title);
    return (
        <li className={itemStyles.item}>
            <span style={{width: '50%'}}><a href={item.url}>{item.title}</a></span>
            <span style={{width: '20%'}}>{item.author}</span>
            <span style={{width: '10%'}}>{item.num_comments}</span>
            <span style={{width: '10%'}}>{item.points}</span>
            <span style={{width: '10%'}}>
                <button type="button" onClick={handleDismiss}
                        className={ `${itemStyles.button} ${itemStyles.buttonSmall}` }>
                    Dismiss
                </button>
            </span>
        </li>
    );
}

export default StoryItem;