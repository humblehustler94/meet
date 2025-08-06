import { useState } from 'react'; // We no longer need useEffect

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => { // <-- 1. Prop received
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
        // --- Refactor code here ---
        // <-- 2. Function updated
    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => 

            location.toUpperCase().indexOf(value.toUpperCase()) > -1
        ) : [];

        setQuery(value);
        // Ensure suggestions are shown when the user is typing.
        setShowSuggestions(true);

        let infoText;
        if(filteredLocations.length === 0 ) {
            infoText = "We can not find the city you are looking for. Please try another city";
        } else {
            infoText = "";
        }
        setInfoAlert(infoText);
    };

    // <-- Function updated
    const handleItemClicked = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false); // Hide the list after selection
        setCurrentCity(suggestion);
        setInfoAlert(""); // Clears the alert on successful selection
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