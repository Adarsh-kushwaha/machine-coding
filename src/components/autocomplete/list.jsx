import "./autocomplete.css"

export const List = ({ item, onSelect }) => {
    return (
        <div className="list" onClick={() => onSelect(item)}>
            {item}
        </div>
    )
}
