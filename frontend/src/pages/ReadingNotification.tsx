import {
    Box
} from "@mui/material";
import {
    Group
} from "../types/domain-types";
import { useEffect, useState } from 'react';
import Session from "supertokens-auth-react/recipe/session";
import { mutate } from "swr";
import { useNavigate, useParams } from "react-router";
import { useGroupContext } from "../context/GroupContextProvider";
import { GroupSummary } from '../types/ContextTypes';
import { useSearchParams } from "react-router-dom";
import { useGroupDetails } from "../hooks/useGroup";

const ReadingNotification = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setActiveGroup } = useGroupContext();
    const navigate = useNavigate();
    const groupId: string | undefined = useParams().groupId;
    const readingId: string | undefined = useParams().readingId;
    
    if(!groupId) return;
    if(!readingId) return;

    const { data : group, isLoading } = useGroupDetails<Group>(groupId);
    useEffect(() => {
        if(!Session.doesSessionExist){
            //SESSION EXISTS
            mutate(
                key => typeof key === "string" && key.includes("/api/groups/"),
                undefined,
                { revalidate: false }
            );

            if(group){
                const groupSummary: GroupSummary = {  
                    id: groupId,
                    name: group.name,
                    role: group.groupUser[0].role,
                    groupType: group.groupType
                }
            setActiveGroup(groupSummary);
            navigate(`/filefeedback/${readingId}`);
            }
        } else {
            //SESSION DNE
            if(readingId){
                sessionStorage.setItem("readingNotificationReadingId", readingId);
                sessionStorage.setItem("readingNotificationGroupId", groupId);
            }
            navigate("/auth");
        }
    }, [isLoading]);


    return (
        <>
        <Box>

        </Box>
        </>
    )
}

export default ReadingNotification;