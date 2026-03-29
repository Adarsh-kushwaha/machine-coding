export const Menulist = ({name, onSelect}) => {

    const handleSelectMenu = () => {
        onSelect(name)
    }

    return (
        <button onClick={handleSelectMenu}>{name}</button>
    )
}