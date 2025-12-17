import {
  Box,
  CircularProgress,
} from "@mui/material";
import { useGroupGet } from "../hooks/useGroup";
import { useParams } from "react-router-dom";
import GroupsPersonalForm from "../components/group/GroupsPersonalForm";

const GroupsPersonal = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const url = `${import.meta.env.VITE_API_HOST}/api/groups/${groupId}`;

  const { group, isLoading, error } = useGroupGet(url);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={6} >
        <CircularProgress />
      </Box>
    );
  }

    return (
        <GroupsPersonalForm group={group} />
    )
}
export default GroupsPersonal;