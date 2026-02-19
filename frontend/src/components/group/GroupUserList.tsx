import {
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { GroupUser } from "../../types/domain-types"

interface Props {
  groupUsers: GroupUser[];
}

const GroupUserList: React.FC<Props> = ({groupUsers}) => {

    const getName = (gu: GroupUser) => {
        if(!gu.user.userProfile?.firstName || !gu.user.userProfile?.firstName){
            return "Name unknown";
        } else {
            return `${gu.user.userProfile.firstName} ${gu.user.userProfile.lastName}`;
        }
    }

    return (
    <Grid container spacing={3}>
        <>
        {groupUsers.map((gu: GroupUser, index) => (
            <Grid key={index}>
            <Card>
                <CardContent sx={{p:2, backgroundColor:"whitesmoke"}}>
                    <Typography color={getName(gu) === "Name unknown" ? "red" : "success"}>
                        {getName(gu)}                            
                        {gu.role === "ADMIN" ? (
                            <span>&nbsp;(Admin)</span>
                        ) : (
                            <span>&nbsp;</span>
                        )}
                    </Typography>
                </CardContent>
            </Card>
            </Grid>
        ))}
        </>            
    </Grid>
  );
}
export default GroupUserList;