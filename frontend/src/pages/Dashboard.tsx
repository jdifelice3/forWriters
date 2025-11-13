// import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";
// import { getApiDomain } from "../config";
// import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import { useEffect } from 'react';
import Session from "supertokens-auth-react/recipe/session";

export default function Dashboard() {
    useEffect(() => {
        const fetchUserId = async() => {
            const userId = await Session.getUserId();
            //create the user in the db
            console.log("Logged in as user:", userId);
        }
        fetchUserId();
    }, []);

    return (
        <>
            <section className="main-container-fw">
                <div className="inner-content-fw">
                    <strong>Your Writing Group Memberships</strong>
                {/* </div>
                <div> */}
                    <List dense={false}>
                        <ListItem component="a" href="/writersgroup">
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                                <ListItemText
                                    primary="Bucks County Writers Group"
                                    secondary='Doylestown, PA'
                                />
                        </ListItem>
                    </List> 
                </div>
            </section>
            <div>&nbsp;</div>
            <section className="main-container-fw">
                <div className="inner-content-fw">
                    <strong>Writers You Like</strong>
                </div>
            </section>
            <div>&nbsp;</div>
            <section className="main-container-fw">
                <div className="inner-content-fw">
                    <strong>Readers You Like</strong>
                </div>
            </section>
        </>
    );
}
