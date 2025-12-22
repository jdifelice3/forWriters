import { Reading } from "../../types/domain-types";
import { GroupType } from "../../util/Enum";
import ReadingScheduleForm from "./ReadingScheduleForm";
import ReadingScheduleFormPersonal from "./ReadingScheduleFormPersonal";
import { ReadingCommands } from "../../types/ReadingTypes";
import {
    Card,
    CardContent,
    Grid,
    Stack
} from "@mui/material";
import { useGroupContext } from "../../context/GroupContextProvider";

interface ReadingScheduleProps {
  readings: Reading[];
  commands: ReadingCommands;
}


const ReadingList: React.FC<ReadingScheduleProps> = ({readings, commands}) => {
    const { activeGroup } = useGroupContext();
    return (
        <Stack spacing={2} >
            {readings.map((r, index) => (
                <Card key={index} className="readingCardReview" >
                    <CardContent>
                        {activeGroup?.groupType ===  GroupType.WRITING ? (
                            <ReadingScheduleForm reading={r} commands={commands}/>
                        ) : (
                            <ReadingScheduleFormPersonal reading={r} commands={commands}/>
                        )}
                    </CardContent>
                </Card>
            ))}
        </Stack>
    )
}
export default ReadingList