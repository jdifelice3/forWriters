import { Link, useNavigate } from "react-router-dom";
import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";

export default function Home() {
    const session = useSessionContext();
    const navigate = useNavigate();

    if (session.loading) {
        return null;
    }

    // if (session.doesSessionExist){
    //     console.log('session exists');
    //     navigate("/dashboard");
    // }
    async function logoutClicked() {
        await signOut();
        navigate("/");
    }
    return (
        <>
            <section className="main-container">
                <div className="inner-content">
                    <h1>
                        <strong>forWriters</strong>
                    </h1>
                    <div>
                        {session.doesSessionExist ? (
                            <p>
                                You're signed in already, <br /> check out the Dashboard! 👇
                            </p>
                        ) : (
                            <p>Sign-in to continue</p>
                        )}
                    </div>
                    <nav className="buttons">
                        {session.doesSessionExist ? (
                            <>
                            <Link to="/dashboard" className="dashboard-button">
                                Dashboard
                            </Link>
                            <button className="dashboard-button" onClick={logoutClicked}>
                                Sign-out
                            </button>
                            </>
                        ) : (
                            <Link to="/auth" className="dashboard-button">
                                Sign-up / Login
                            </Link>
                        )}
                    </nav>
                </div>
            </section>
        </>
    );
}
