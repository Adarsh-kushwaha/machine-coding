import Virtualised from "../components/Virtualised"


export default function VirtualisedList() {
    const data = Array.from({ length: 1700000 }, (_, index) => index + 1)
    return (
        <div>
            <h1>Virtualised List</h1>
            <Virtualised data={data} render={(row) => `My Row ${row}`} />
        </div>
    )
}