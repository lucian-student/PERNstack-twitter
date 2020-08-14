import React, { createContext, useState } from 'react';
export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    const [tweet, setTweet] = useState(null);
    const [comments, setComments] = useState([]);

    const [queryValues, setQueryValues] = useState({
        query: 'general',
        page: 0,
        sortValue: null
    });

    const [filters, setFilters] = useState({
        num_of_likes: false
    });

    const required = () => {
        return filters.num_of_likes;
    }
    return (
        <CommentsContext.Provider
            value={{
                tweet,
                setTweet,
                comments,
                setComments,
                queryValues,
                setQueryValues,
                filters,
                setFilters,
                required
            }}>
            {children}
        </CommentsContext.Provider>
    );
};