import ListItem from "./list-tem"

const Suggestion = ({suggestions, onSelect, query, isLoading}) => {

    if(isLoading){
        return (<div className="auto-suggestion" style={{color:"black", padding:"8px"}}>
            loading...
        </div>)
    }

    return (
        <div className="auto-suggestion">
            {suggestions.map((sugestion, index) => <ListItem key={index} item={sugestion} onSelect={onSelect} query={query} />)}
        </div>
    )
}

export default Suggestion