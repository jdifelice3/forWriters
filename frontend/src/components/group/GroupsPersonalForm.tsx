// import { useState } from "react";
// import { Group } from "../../types/domain-types";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Divider,
// } from "@mui/material";
// import {
//     Reading
// } from "../../types/domain-types";
// import GroupIcon from '@mui/icons-material/Group';
// import Grid from "@mui/material/Grid";
// import ReadingList from "../reading/ReadingList";

// import { useUserContext } from "../../context/UserContext";
// import { useGroupContext } from "../../context/GroupContextProvider";
// import { useReadings } from "../../hooks/reading/useReadings";
// import { useReadingDomain } from "../../hooks/reading/useReadingDomain";
// import { useReadingsData } from "../../hooks/reading/useReadingsData";
// import { useReadingsUI } from "../../hooks/reading/useReadingsUI";

// import { ReadingCalendar } from "../reading/ReadingCalendar";

// type FormInput = {
//     name: string,
//     readingDate: Date,
//     readingStartTime: string,
//     readingEndTime: string,
//     submissionDeadline: Date,
//     description: string,
//     schedule: string
// }

// interface GroupsPersonalFormProps {
//     group: Group;
// }

// const GroupsPersonalForm: React.FC<GroupsPersonalFormProps> = ({group}) => {
//     const navigate = useNavigate();
//     const { user, isLoading } = useUserContext();
//     const { readings, isLoading: isReadingLoading } = useReadings();
//     const ui = useReadingsUI();
//     const domain = useReadingDomain(group?.id ?? null, user?.id ?? null);
//     const { myReadings, myFiles } = useReadingsData(readings, user);
    
//     const [open, setOpen] = useState(false);
    

//     const userIndex: number = group.groupUser.findIndex(item => item.userId === user.id);
//     const isAdmin = group.groupUser[userIndex].role === "ADMIN";
    
//     return (
//         <Box style={{marginLeft: '75px'}} sx={{ maxWidth: 600, mx: "auto", p: 4}}>
//             <Typography variant="h4" mb={3}>
//                 <GroupIcon 
//                     sx={{ 
//                         fontSize: '48px',
//                         verticalAlign: "bottom", 
//                     }}
//                     />&nbsp;
//                     {group!.name}
//             </Typography>

//             <Divider sx={{ my: 4 }} />

//             <Grid container size={12} spacing={2} sx={{width: 300}}>
//                 <Grid alignItems="center" justifyContent="center" size={12}>
//                     <ReadingCalendar 
//                         readings={readings}
//                         isAdmin={isAdmin}
//                         domain={domain}
//                         ui={ui}
//                         onFeedback={(readingId) =>
//                             navigate(`/readingfeedback/${readingId}`)
//                         }
//                     />
//                 </Grid>
//                 <Grid alignItems="center" justifyContent="center" size={12  }>
//                     {group.reading.length > 0 ? (
//                     <ReadingList readings={group.reading} domain={domain} />
//                     ) : (
//                         <div></div>
//                     )}
//                 </Grid>
//             </Grid>
//     </Box>
//     )
// }
// export default GroupsPersonalForm;