export const Menulist = ({name, onSelect}) => {

    const handleSelectMenu = () => {
        onSelect(name)
    }

    return (
        <button onCanPlay={handleSelectMenu}>{name}</button>
    )
}