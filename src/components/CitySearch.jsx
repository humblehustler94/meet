// src/components/CitySearch.jsx
// This is the basic component structure
// We add the data-testid attribute so our App.test.js can find 

// We are using data-testid to match our modern App.test.js
const CitySearch = () => {
    return (
        <div data-testid="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
            />
        </div>
    )
}

export default CitySearch;