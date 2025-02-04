
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const storyBooks = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

const getAsyncStories = (isSuccess = true) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                resolve({data: {stories: storyBooks}});
            }
            else {
                reject("Network error!");
            }
        }, 2000);
    });
}

export default getAsyncStories;
