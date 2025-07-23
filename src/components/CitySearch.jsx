// src/components/CitySearch.jsx
import { useState, useEffect } from 'react'; // Add useEffect 

// 1. Accept `allLocations` as a prop
const CitySearch = ({ allLocations, setCurrentCity }) => {
    // 2. Create the new state variable for query and suggestions
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Set suggestions to allLocations when the component mounts or allLocations changes
    useEffect(() => {
        const initialSuggestions = allLocations || [];
        setSuggestions(initialSuggestions);
    }, [`${allLocations}`]);
   

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
        setCurrentCity(suggestion); // Notify App of the change
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
                <ul className="suggestions" data-testid="suggestion-list">
                    {suggestions.map((suggestion) => {
                        return (
                            <li onClick={() => handleItemClicked(suggestion)} key={suggestion}>
                                {suggestion}
                            </li>
                        );
                    })}
                    <li key='See all cities' onClick={() => handleItemClicked("See all cities")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            ) : null}
        </div>
    )
}

export default CitySearch;