import React, { createContext, useState } from 'react';
export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        username: false,
        num_of_likes: false,
        num_of_comments: false
    });
    const [query, setQuery] = useState('general');
    return (
        <FilterContext.Provider
            value={{
                filters, setFilters, query, setQuery
            }}>
            {children}
        </FilterContext.Provider>
    );
};