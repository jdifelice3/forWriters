"use client";

import { useState, useEffect } from "react";
//import { GroupDescriptionType } from "../../types/domain-types";
import { Group } from "../../types/domain-types";
import {
  Typography,
} from "@mui/material";
import { useGroupContext } from "../../context/GroupContextProvider";

interface GroupDescriptionProps {
  groupId: string;
}

const GroupDescription: React.FC<GroupDescriptionProps> = ({groupId}) => {
    const { activeGroup } = useGroupContext();
  const [group, setGroup] = useState<Group | null>(null);
  const groupDescriptionUrl = `${import.meta.env.VITE_API_HOST}/api/groups/join/description/${groupId}`;
  
  useEffect(() => {
        (async () => {
            if(!activeGroup) return;
            const res = await fetch(groupDescriptionUrl, 
            { 
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (res.ok) {
                const data: Group = await res.json();
                setGroup(data);
            }
        })();
      }, [activeGroup, groupDescriptionUrl]);
      
  return (
    <div>
        <Typography sx={{mb:2}}>
            {group?.description}
        </Typography>
        {group !== null && group.groupType === "WRITING" && (   
            <Typography sx={{mb:2}}>
                {group?.groupAddress[0].street}, {group?.groupAddress[0].city}, {group?.groupAddress[0].state}
            </Typography>
        )}

        {group?.websiteUrl ? (
        <Typography >
            <a href={group?.websiteUrl} target='_blank' rel='noopener noreferrer'>{group?.websiteUrl}</a>
        </Typography>
        ) : (
            <div></div>
        )}
    </div>
  )
}

export default GroupDescription; 