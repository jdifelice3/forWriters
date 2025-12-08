"use client";

import { useState, useEffect } from "react";
import { GroupDescriptionType } from "../types/domain-types";
import {
  Typography,
} from "@mui/material";

interface GroupDescriptionProps {
  groupId: string;
}

const GroupDescription: React.FC<GroupDescriptionProps> = ({groupId}) => {
  const [groupDesc, setGroupDesc] = useState<GroupDescriptionType | null>(null);
  const groupDescriptionUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/groups/${groupId}/description`;
  
  useEffect(() => {
        (async () => {
          const res = await fetch(groupDescriptionUrl, 
          { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (res.ok) {
              const data: GroupDescriptionType = await res.json();
              setGroupDesc(data);
          }
        })();
      }, [groupId, groupDescriptionUrl]);

  return (
    <div>
        <Typography sx={{mb:2}}>
            {groupDesc?.description}
        </Typography>
        <Typography sx={{mb:2}}>
            {groupDesc?.groupAddress[0].street}, {groupDesc?.groupAddress[0].city}, {groupDesc?.groupAddress[0].state}
        </Typography>
        {groupDesc?.websiteUrl ? (
        <Typography >
            <a href={groupDesc?.websiteUrl} target='_blank' rel='noopener noreferrer'>{groupDesc?.websiteUrl}</a>
        </Typography>
        ) : (
            <div></div>
        )}
    </div>
  )
}

export default GroupDescription; 