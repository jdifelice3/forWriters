import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Reading } from "../../types/domain-types";
import AuthorList from "../member/AuthorList";
import { getCardBackgroundColor } from "../../util/readingUtil";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  Stack
} from "@mui/material";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useReadingGet }  from "../../hooks/useReading";
import ReadingSchedule from "./ReadingSchedule";

interface ReadingScheduleProps {
  readings: Reading[];
}

const ReadingSchedule: React.FC<ReadingScheduleProps> = ({readings}) => {
    const [reading, setReading] = useState<Reading[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    return (
    <Card>
        <CardContent>
            <ReadingSchedule readings={readings} />
        </CardContent>
    </Card>
    )
}
export default ReadingSchedule;