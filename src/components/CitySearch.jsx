// src/components/CitySearch.jsx
import { useState } from 'react'; // 1. Import useState

const CitySearch = () => {
    // 2. Create the state variable. Default is false
    const [showSuggestions, setShowSuggestions] = useState(false);
    return (
        <div data-testid="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                // This is the new prop: when the input is focused (clicked),
                // set showSuggestions to true
                onFocus={() => setShowSuggestions(true)}
            />
            {/* The suggestion list will go here soon */}
            { showSuggestions ? (
                <ul className='suggestions'></ul>
            ) : null}
        </div>
    )
}

export default CitySearch;