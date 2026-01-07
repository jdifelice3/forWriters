import { useGroupContext } from "../../context/GroupContextProvider";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

interface JoinRequest {
  id: string;
  userName: string;
  userId: string;
  groupId: string;
  groupName: string;
}

interface Props {
  groupId: string;
  requests: JoinRequest[];
  onAction: (message: string) => void;
  onError: (error: string) => void;
}

export default function GroupJoinRequestList({
  groupId,
  requests,
  onAction,
  onError,
}: Props) {

  const handleAction = async (
    requestId: string,
    action: "approve" | "reject"
  ) => {

    try {
        console.log(`${import.meta.env.VITE_API_HOST}/api/groups/${groupId}/join-requests/${requestId}/${action}`)
        const res = await fetch(
            `${import.meta.env.VITE_API_HOST}/api/groups/${groupId}/join/join-requests/${requestId}/${action}`,
            {
                method: "PUT",
                credentials: "include",
            }
        );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Request failed");

      onAction(
        action === "approve"
          ? "User approved and added to the group."
          : "User’s request has been rejected."
      );
    } catch (err) {
      if (err instanceof Error) onError(err.message);
      else onError("Unknown error occurred.");
    }
  };

  return (
    <Stack spacing={2}>
      {requests.length === 0 && (
        <Typography>No pending requests.</Typography>
      )}

      {requests.map((req) => (
        <Card key={req.id}>
          <CardContent>
            <Typography variant="h6">{req.userName}</Typography>
            <Typography variant="body2" color="text.secondary">
              Requesting to join: {req.groupName}
            </Typography>

            <Box mt={2} display="flex" gap={2}>
              <Button
                color="success"
                variant="contained"
                onClick={() => handleAction(req.id, "approve")}
              >
                Approve
              </Button>

              <Button
                color="error"
                variant="outlined"
                onClick={() => handleAction(req.id, "reject")}
              >
                Reject
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
