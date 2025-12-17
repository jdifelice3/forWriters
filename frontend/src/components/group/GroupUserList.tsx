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

    return (
    <Grid container spacing={3}>
        <>
        {groupUsers.map((gu: GroupUser) => (
            <Grid>
            <Card>
                <CardContent sx={{p:2, backgroundColor:"whitesmoke"}}>
                    <Typography >
                        {gu.user.userProfile ? gu.user.userProfile.firstName : ""} 
                        {gu.user.userProfile ? gu.user.userProfile.lastName : ""}                            
                        {gu.isAdmin ? (
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