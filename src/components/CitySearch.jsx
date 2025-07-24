import { useState } from 'react'; // We no longer need useEffect

const CitySearch = ({ allLocations, setCurrentCity }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    // The 'suggestions' state and the 'useEffect' hook have been removed.

    // Calculate suggestions directly from props and state on every render.
    // This is the key change that fixes the bug.
    const suggestions = allLocations
        ? allLocations.filter(location =>
            location.toUpperCase().indexOf(query.toUpperCase()) > -1
          )
        : [];

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setQuery(value);
        // Ensure suggestions are shown when the user is typing.
        setShowSuggestions(true);
    };

    const handleItemClicked = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false); // Hide the list after selection
        // Make sure setCurrentCity is being called
        if(setCurrentCity) {
            setCurrentCity(suggestion);
        }
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
                    {/* This mapping now uses the calculated 'suggestions' constant */}
                    {suggestions.map((suggestion) => (
                        <li onClick={() => handleItemClicked(suggestion)} key={suggestion}>
                            {suggestion}
                        </li>
                    ))}
                    <li key='See all cities' onClick={() => handleItemClicked("See all cities")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            ) : null}
        </div>
    );
}

export default CitySearch;