import { Link } from "react-router-dom";

function Home() {

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
            <h2>List Of All Machine Coding Problems</h2>
            <Link to="/toast">Toast</Link>
            <Link to="/infinite-scroll">Infinite Scroll</Link>
            <Link to="/intersection-observer">Intersection Observer</Link>
            <Link to="/popover">Popover</Link>
            <Link to="/virtualised-list">Virtualised List</Link>
            <Link to="/autocomplete">Autocomplete</Link>
            <Link to="/accordion">Accordion</Link>
            <Link to="/tabs">Tabs</Link>
            <Link to="/react-memo">React Memo</Link>
        </div>
    )
}

export default Home;