"use client";

import { FileListProperties } from '../types/File';
import {
  Card,
  CardContent,
  CardActions,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";

interface Props {
  collection: string[]; //replace with appropriate object
  onSendData: (data: string[]) => void;
  listProperties: FileListProperties;
}

//const ListTemplate: React.FC<Props> = ({collection, onSendData, listProperties}) => {  //use this if there are props
const ListTemplate: React.FC<Props> = () => {
    return(
        <Grid container spacing={2}>
            <Stack spacing={2} sx={{width:"500px"}}> 
                <Card>
                    <CardContent>
                        {/* CardContent code */}
                    </CardContent>
                    <CardActions>
                        {/* CardAction code */}
                    </CardActions>
                </Card>
            </Stack>
        </Grid>
    );
}
export default ListTemplate;