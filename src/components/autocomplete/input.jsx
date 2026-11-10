const InputText = ({value, onChange}) => {

    const handleOnChange = (e) => {
        onChange(e.target.value)
    }

    return <input onChange={handleOnChange} value={value}/>  
}

export default InputText;