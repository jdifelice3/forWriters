import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

interface Props {
  groupId: string;
//   onAction: (message: string) => void;
//   onError: (error: string) => void;
}

const GroupUserList = ({
  groupId,
//   onAction,
//   onError,
}: Props) => {
  
  const[groupUsers, setGroupUsers]:any = useState([]);

  const url = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/groups/${groupId}/groupuser`;
    
  useEffect(() => {
    if (!groupId) return;
    try {
      (async () => {
        const res = await fetch(
        url,
        {
          method: "GET",
          credentials: "include",
        })
      
        if (res.ok) {
            const data = await res.json();
            setGroupUsers(data);
            
        }
        })();
    } catch (err) {
    //   if (err instanceof Error) onError(err.message);
    //   else onError("Unknown error occurred.");
    }

    }, [groupId]);

  return (
    <Card>
        <CardContent>
    <Grid container spacing={3}>
        <Grid size={12}>
            <Typography variant="h6" mb={0}>
                Group Members
            </Typography>
        </Grid>
        {groupUsers.length > 0 && 
            groupUsers.map((gu: any) => (
                <Grid>
                <Card>
                    <CardContent sx={{p:2, backgroundColor:"whitesmoke"}}>
                        <Typography >
                            {gu.user.userProfile.firstName} {gu.user.userProfile.lastName}                            
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
            ))}            
        </Grid>
        </CardContent>
        </Card>
    
  );
}
export default GroupUserList;