import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    // const sessionContext = useSessionContext();

    const okClicked = () => {
        navigate("../");
    }

    return (
        <>
            <div id="main-container" className="main-container"  style={{width: 300}}>
                <div className="top-band success-title bold-500">
                    Login successful
                </div>
                <div className="inner-content">
                    <div className="buttons">
                        <button onClick={okClicked} className="dashboard-button">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
