import React, { createContext, useState } from 'react';
export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        username: false,
        num_of_likes: false,
        num_of_comments: false
    });

    const requiredGeneral = () => {
        return !filters.username && !filters.num_of_comments && !filters.num_of_likes;
    }
    const [query, setQuery] = useState('general');

    const [yourFilters, setYourFilters] = useState({
        num_of_likes: false,
        num_of_comments: false
    });

    const required = () => {
        return !yourFilters.num_of_likes && !yourFilters.num_of_comments;
    }

    const [yourQuery, setYourQuery] = useState('general');

    return (
        <FilterContext.Provider
            value={{
                filters,
                setFilters,
                query,
                setQuery,
                yourFilters,
                setYourFilters,
                yourQuery,
                setYourQuery,
                requiredGeneral,
                required
            }}>
            {children}
        </FilterContext.Provider>
    );
};