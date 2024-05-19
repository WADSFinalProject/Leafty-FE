import filter from "../assets/icons/filter.svg"

function filterDashboard({ tablet }) {
    return <>
        <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn m-1 flex gap-2 rounded-full" style={{background: "#94C3B3"}}>{tablet ? null : <span className="font-bold" style={{ color: "#F7FAFC" }}>All Time</span>}<img src={filter}></img></div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border-white border-2 border-solid">
                <li><a>All Time</a></li>
                <li><a>Daily</a></li>
                <li><a>Weekly</a></li>
                <li><a>Monthly</a></li>
                <li><a>Yearly</a></li>
            </ul>
        </div>
    </>
}

export default filterDashboard;