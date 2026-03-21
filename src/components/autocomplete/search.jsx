import "./autocomplete.css"

export const Search = ({ setQuery, onClear, query, onSelect, selectedItem }) => {
    const onBlurHandle = () => {
        onSelect("")
    }

    return (
        <>
            <div className="search-container">
                <input type="text" placeholder="Search your recipie" onChange={(e) => setQuery(e.target.value)} value={query} onInput={onBlurHandle} />
                <button onClick={onClear}>X</button>
            </div>
        </>
    )
}