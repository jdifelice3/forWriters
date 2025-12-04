"use client";

import { FileListProperties } from '../types/File';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import FileIcon from './FileIcon';
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import PreviewIcon from "@mui/icons-material/Preview";

interface Props {
  collection: string[]; //replace with appropriate object
  onSendData: (data: string[]) => void;
  listProperties: FileListProperties;
}

//const ListTemplate: React.FC<Props> = ({collection, onSendData, listProperties}) => {  //use this if there are props
const ListTemplate: React.FC<Props> = ({}) => {
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