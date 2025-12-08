import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import { CollaboratorRequest } from "../types/domain-types";
interface Props {
  requests: CollaboratorRequest[];
  onAction: (message: string) => void;
  onError: (error: string) => void;
}

const CollaboratorRequestList = ({
  requests,
  onAction,
  onError,
}: Props) => {
  const handleAction = async (
    collaboratorId: string,
    action: "approve" | "reject"
  ) => {
        const url = `${import.meta.env.VITE_API_HOST}/api/users/admin/requests/${collaboratorId}/${action}`;

    try {
        const res = await fetch(
        url,
        {
          method: "POST",
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
            <Typography variant="h6">{req.user.userProfile?.firstName} {req.user.userProfile?.lastName}</Typography>
            <Typography variant="body2" color="text.secondary">
               sent a request to connect
            </Typography>

            <Box mt={2} display="flex" gap={2}>
              <Button
                color="success"
                variant="contained"
                onClick={() => handleAction(req.id, "approve")}
              >
                Accept
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
export default CollaboratorRequestList;