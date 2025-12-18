import React, { useState } from "react";
import { GroupBasic } from "../../types/domain-types";
import { getUrlLabel } from "../../types/Url";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Link,
  ListItem,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";

interface GroupDetailsProps {
  group: GroupBasic;
}

export const GroupDetails: React.FC<GroupDetailsProps> = ({ group }) => {

  const [form, setForm] = useState({
    name: group.name || "",
    description: group.description || "",
    websiteUrl: group.websiteUrl || "",
    imageUrl: group.imageUrl || "",
    street: (group.groupAddress) ?  group.groupAddress[0].street : "",
    city: (group.groupAddress) ?  group.groupAddress[0].city : "",
    state: (group.groupAddress) ?  group.groupAddress[0].state : "",
    zip: (group.groupAddress) ?  group.groupAddress[0].zip : "",
    urls: (group.groupUrl) ? group.groupUrl : []  
  });

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${form.street}, ${form.city}, ${form.state} ${form.zip}`
  )}`;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Group Details
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
                    <Typography sx={{fontWeight: "bold"}}>Address:</Typography>
                </ListItem>
                <ListItem>
                    <Typography>{form.street}<br/>{`${form.city}, ${form.state} ${form.zip}`}</Typography>
                </ListItem>
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
              <ListItem>
              <Link href={mapUrl} target="_blank" rel="noopener">
                View on Google Maps
              </Link>
              </ListItem>
          </Stack>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
