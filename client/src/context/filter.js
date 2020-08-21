import React, { createContext, useState } from 'react';
export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [route, setRoute] = useState(null);

    const [generalTweets, setGeneralTweets] = useState(null);

    const [filters, setFilters] = useState({
        username: false,
        num_of_likes: false,
        num_of_comments: false
    });

    const requiredGeneral = () => {
        return !filters.username && !filters.num_of_comments && !filters.num_of_likes;
    }
    const [generalQueryValues, setGeneralQueryValues] = useState({
        query: 'general',
        page: 0,
        sortValue: null,
        username: null
    });

    const [yourTweets, setYourTweets] = useState(null);
    const [yourFilters, setYourFilters] = useState({
        num_of_likes: false,
        num_of_comments: false
    });

    const required = () => {
        return !yourFilters.num_of_likes && !yourFilters.num_of_comments;
    }
    //FORM VALUE same rework as in general will folow!!!
    const [yourQueryValues, setYourQueryValues] = useState({
        query: 'general',
        page: 0,
        sortValue: null
    });

    return (
        <FilterContext.Provider
            value={{
                filters,
                setFilters,
                yourFilters,
                setYourFilters,
                requiredGeneral,
                required,
                generalQueryValues,
                setGeneralQueryValues,
                yourQueryValues,
                setYourQueryValues,
                generalTweets,
                setGeneralTweets,
                yourTweets,
                setYourTweets,
                route,
                setRoute
            }}>
            {children}
        </FilterContext.Provider>
    );
};