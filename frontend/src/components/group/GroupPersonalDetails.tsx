import React, { useState } from "react";
import { Group } from "../../types/domain-types";
import { getUrlLabel } from "../../types/UrlTypes";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  ListItem,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";

interface GroupDetailsProps {
  group: Group;
}

export const GroupPersonalDetails: React.FC<GroupDetailsProps> = ({ group }) => {

  const [form, setForm] = useState({
    name: group.name || "",
    description: group.description || "",
    websiteUrl: group.websiteUrl || "",
    imageUrl: group.imageUrl || "",
    urls: (group.groupUrl) ? group.groupUrl : []  
  });

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Details
        </Typography>

        <Grid container spacing={2}>

          <Grid size={2}>  
            <Avatar
              src={form.imageUrl}
              alt={form.name}
              sx={{ width: 120, height: 120 }}
            />
          </Grid>

          <Grid size={4}>
            <Stack >
                <ListItem>
                    <Typography><a href={form.websiteUrl} target='_blank' rel='noopener noreferrer'>{form.websiteUrl}</a></Typography>
                </ListItem>
            </Stack>
          </Grid>

          <Grid size={6}>
            <Stack >
                <ListItem>
                    <Typography sx={{fontWeight: "bold"}}>Social Media:</Typography>
                </ListItem>
                <ListItem>
                    <Stack>
                    {form.urls.map((u) => (
                      <ListItem sx={{p:0}}>
                        <Typography><a href={u.url} target='_blank' rel='noopener noreferrer'>{getUrlLabel(u.urlType)}</a></Typography>
                      </ListItem>
                    ))}
                    </Stack>
                </ListItem>
            </Stack>

          </Grid>

        </Grid>

        <Box mt={2}>
          <Grid size={12}>
            <Stack>
              <ListItem>
                <Stack>
                    <Typography fontWeight={"bold"}>
                        Description
                    </Typography>
                    <Typography>
                        {group.description}
                    </Typography>
                </Stack>
              </ListItem>
            </Stack>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
