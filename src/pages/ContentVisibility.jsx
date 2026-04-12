import "../components/toast/infinte-scroll.css"

export default function ContentVisibility() {

    return (
        <div>
            <h1>Content Visibility</h1>
            <div className="list-container2" >
                {Array.from({ length: 100 })?.map((item, index) => {
                    return (
                        <div key={index} className="list2-cv">
                            <h4>{index + 1}</h4>
                            <img src="https://picsum.photos/300/200" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}