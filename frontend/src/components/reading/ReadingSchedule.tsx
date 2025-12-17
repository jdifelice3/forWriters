import { Reading } from "../../types/domain-types";
import { ReadingScheduleType } from "../../util/Enum";
import ReadingScheduleForm from "./ReadingScheduleForm";
import ReadingScheduleFormPersonal from "./ReadingScheduleFormPersonal";
import { ReadingCommands } from "../../types/Reading";
import {
    Card,
    CardContent,
    Grid
} from "@mui/material";

interface ReadingScheduleProps {
  readings: Reading[];
  commands: ReadingCommands;
}

const ReadingSchedule: React.FC<ReadingScheduleProps> = ({readings, commands}) => {

    return (
        <Grid size={12} container spacing={2} sx={{ width:"300px"}}>
            {readings.map((r, index) => (
            <div key={index} >
            <Grid size={12} sx={{borderBottom: 0, borderColor:"wheat", pb:2,}}>
                <Card sx={{backgroundColor: "lavenderblush"}}>
                    <CardContent>
                {r.scheduledType === ReadingScheduleType.SCHEDULED ? (
                    <ReadingScheduleForm reading={r} />
                ) : (
                    <ReadingScheduleFormPersonal reading={r} />
                    
                )}
                    </CardContent>
                </Card>
            </Grid>
            </div>
            ))}
        </Grid>
    )
}
export default ReadingSchedule