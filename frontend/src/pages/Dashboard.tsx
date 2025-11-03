// import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";
// import { getApiDomain } from "../config";
// import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    // const navigate = useNavigate();
    // const sessionContext = useSessionContext();

    // async function callAPIClicked() {
    //     try {
    //         const response = await fetch(getApiDomain() + "/sessioninfo");
    //         const data = await response.json();
    //         window.alert("Session Information:\n" + JSON.stringify(data, null, 2));
    //     } catch (err: unknown) {
    //         window.alert("Error calling API: " + err);
    //     }
    // }

    // async function logoutClicked() {
    //     await signOut();
    //     navigate("/");
    // }

    return (
        <>
            <div id="main-container" className="main-container"  style={{width: 300}}>
            </div>
        </>
    );
}
