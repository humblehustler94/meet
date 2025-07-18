// src/components/CitySearch.jsx
import { useState } from 'react';

// 1. Accept `allLocations` as a prop
const CitySearch = ({ allLocations }) => {
    // 2. Create the new state variable for query and suggestions
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // 4. Create the handler function
    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];

        setQuery(value);
        setSuggestions(filteredLocations);
    };

    // --- 1. CREATE the new handler function ---
    const handleItemClicked = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false); // Hide the list after selection
    };

    return (
        <div data-testid="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />

            {showSuggestions ? (
                <ul className="suggestions">
                    {/* --- 2. ADD onClick to the mapped items --- */}
                    {suggestions.map((suggestion) => {
                        return (
                            <li onClick={() => handleItemClicked(suggestion)} key={suggestion}>
                                {suggestion}
                            </li>
                        );
                    })}
                    {/* --- 3. ADD onClick to the static item --- */}
                    <li key='See all cities' onClick={() => handleItemClicked("See all cities")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            ) : null}
        </div>
    )
}

export default CitySearch;