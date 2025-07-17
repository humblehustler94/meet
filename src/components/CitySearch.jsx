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


    return (
        <div data-testid="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                // 3. Connect the input to the state and event handlers
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
            {/* The suggestion list will go here soon */}
            {showSuggestions ? (
                <ul className='suggestions'>
                    {suggestions.map((suggestion) => {
                        return <li key={suggestion}>{suggestion}</li>
                    })}
                    <li key= 'See all cities'>
                        <b>See all cities</b>
                    </li>
                </ul> // This will be updated next
            ) : null}
        </div>
    );
}

export default CitySearch;