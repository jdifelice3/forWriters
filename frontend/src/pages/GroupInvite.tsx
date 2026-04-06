import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import { tokenValidationResponse } from "../types/InviteTypes";
import { Typography } from "@mui/material";
import { useInviteDomain } from "../hooks/invite/useInviteDomain";

const GroupInvite = () => {
    const [validate, setValidate] = useState<tokenValidationResponse | undefined>(undefined);

    const { token } = useParams();
    const invite = useInviteDomain();
    
    useEffect(() => {
        const fetchData = async () => {
            const response: tokenValidationResponse | undefined = await invite.validate(token);
            setValidate(response);
        };
        fetchData().catch(console.error);
    }, []);

    return (
        <>
        <Typography>
            You’ve been invited to join ${validate?.groupName}
        </Typography>
        <Typography>
            Invited by ${validate?.invitedBy}
        </Typography>
        <Typography>
            Your Role: Member
        </Typography>
        <Typography>
            Invitation sent to: ${validate?.email}
        </Typography>
        </>
    )
}

export default GroupInvite;