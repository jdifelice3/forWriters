import { 
    Button,
    Typography 
} from "@mui/material";
import { useEffect, useState } from 'react';
import Session from "supertokens-auth-react/recipe/session";
import { mutate } from "swr";
import { useNavigate, useParams } from "react-router";
import { useGroupContext } from "../context/GroupContextProvider";
import { useGroupDetails } from "../hooks/useGroup";
import { GroupSummary } from '../types/ContextTypes';
import { Group } from "../types/domain-types";
import { tokenValidationResponse } from "../types/InviteTypes";
import { CompleteResponse } from '../types/GroupInviteTypes';
import { useInviteDomain } from "../hooks/invite/useInviteDomain";
import { useSearchParams } from "react-router-dom";
import { useGroupInvite } from "../hooks/useGroup";
import { Box } from "@mui/material";

const GroupInvite = () => {
    const [validate, setValidate] = useState<tokenValidationResponse | undefined>(undefined);
    const [searchParams, setSearchParams] = useSearchParams();
    const [declined, setDeclined] = useState(false);
    const [groupInviteGroupId, setgroupInviteGroupId] = useState("");
    const { setActiveGroup } = useGroupContext();
    const groupInvite = useGroupInvite(); 
    const navigate = useNavigate();
    const groupId: string | undefined = useParams().groupId;
    const { data: group } = useGroupDetails<Group>(groupId);
    const token: string | null = searchParams.get("token");
    
    let completeResponse: CompleteResponse;

    if(!token) {
        return "Ivalid Token";
    }

    const invite = useInviteDomain();

    useEffect(() => {
        console.log('groupId in useEffect', groupId);
        if(groupId){
            setgroupInviteGroupId(groupId);
        } else {
            throw new Error("GroupId not found");
        }
        const fetchData = async () => {
            const response: tokenValidationResponse | undefined = await groupInvite.validate(token);
            console.log('response in GroupInvite', response);
            setValidate(response);
        }
        fetchData().catch(console.error);
    }, []);

    const onAccept = async() => {
        if(!Session.doesSessionExist){
            //Session exists
            completeResponse = await groupInvite.completeInvite();
            mutate(
                key => typeof key === "string" && key.includes("/api/groups/"),
                undefined,
                { revalidate: false }
            );

            const groupSummary: GroupSummary = {  
                id: completeResponse.groupId,
                name: completeResponse.name,
                role: completeResponse.role,
                groupType: completeResponse.groupType
            }
            setActiveGroup(groupSummary);
            navigate(`/groups/${groupId}`);
        } else {
            if(validate){
                sessionStorage.setItem("groupInviteGroupId", groupInviteGroupId);
                navigate("/auth");          
            }
        }
    }

    const onDecline = async() => {
        console.log('in onDecline');
        console.log('groupId', groupId);
        const success = await groupInvite.declineInvite();
        console.log('decline success', success);
        setDeclined(true);
    }

    return (
        <>
        {!declined ? (
            <Box ml={2}>
            <Typography variant="h6" mb={1} mt={3}>
                You’ve been invited to join <span style={{color: "blue"}}>{validate?.groupName}</span>
            </Typography>
            <Typography variant="body1" mb={1} mt={3}>
                Invited by <b>{validate?.invitedBy}</b>
            </Typography>
            <Typography variant="body1" mb={1} mt={3}>
                Your Role: <b>Member</b>
            </Typography>
            <Typography variant="body1" mb={1} mt={3}>
                Invitation sent to: <b>{validate?.email}</b>
            </Typography>
            <Button variant="contained" sx={{mr: 1, mt: 2}} onClick={onAccept}>
                Accept
            </Button>
            <Button variant="contained" sx={{mt: 2}} onClick={onDecline}>
                Decline
            </Button>
            </Box>
        ) : (
            <Typography variant="h6" mb={1} mt={3}>
                You’ve declined the invitation to join <span style={{color: "blue"}}>{validate?.groupName}</span>
            </Typography>
        )}
        </>
    )
}

export default GroupInvite;