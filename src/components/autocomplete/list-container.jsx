import { List } from "./list"
import "./autocomplete.css"

export const ListContainer = ({ data, loading, error, onSelect }) => {

    return (
        <div className="list-container">
            {data?.length > 0 ? data?.map((r) => (
                <List key={r.id} item={r.name} onSelect={() => onSelect(r)} />
            )) : <div>No Recipie Found</div>}

        </div>
    )
}
