import Button from "./button"

const ListItem = ({item, onSelect, query}) => {
    return <Button label={item} onClick={() => onSelect(item)} data-selected={item.toLowerCase() === query.toLowerCase()}/>
}

export default ListItem