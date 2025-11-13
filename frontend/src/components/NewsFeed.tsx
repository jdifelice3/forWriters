import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddIcon from "@mui/icons-material/Add";
import { extractLinks, extractEmailAddresses } from "../util/links";
import { email } from "zod";

interface NewsFeedProps {
  groupId: string;
  isAdmin: boolean;
}

interface NewsItem {
  id: string;
  title: string;
  content?: string;
  postedAt: string;
  archived: boolean;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ groupId, isAdmin }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const newsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/groups/${groupId}/news`;
  
  useEffect(() => {
    
    fetch(newsUrl, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setNews(data))
      .catch(console.error);
  }, [groupId]);

  const handleAddNews = async () => {
    if (!title) return;
    const res = await fetch(newsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
      credentials: "include",
    });
    if (res.ok) {
      const newItem = await res.json();
      setNews((prev) => [newItem, ...prev]);
      setTitle("");
      setContent("");
      setAdding(false);
    }
  };

  const handleArchive = async (id: string) => {
    const res = await fetch(`${newsUrl}/${id}/archive`, {
      method: "PUT",
      credentials: "include",
    });
    if (res.ok) setNews((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Group News
        </Typography>

        {isAdmin && !adding && (
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            onClick={() => setAdding(true)}
            sx={{ mb: 2 }}
          >
            Add News
          </Button>
        )}

        {isAdmin && adding && (
          <Box mb={3}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={handleAddNews}>
                Post
              </Button>
              <Button onClick={() => setAdding(false)}>Cancel</Button>
            </Stack>
          </Box>
        )}

        {news.map((n) => (
          <Box key={n.id} mb={2} p={1} sx={{ borderBottom: "1px solid #ccc" }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" style={{fontWeight: "bold"}}>{n.title}</Typography>
              {isAdmin && (
                <IconButton size="small" onClick={() => handleArchive(n.id)}>
                  <ArchiveIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Posted on {new Date(n.postedAt).toLocaleDateString()}
            </Typography>
            <Typography dangerouslySetInnerHTML={{ __html: activateLinks(n.content) }}/>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

const activateLinks = (text: string | undefined) => {
  let newText: string = '';
  
  if(text !== undefined){
    const links:string[] = extractLinks(text);

    if(links.length > 0){
      links.forEach((link, index) => {
        newText = text.replace(link,`<a href='${link}' target="_blank" rel="noopener noreferrer">${link}</a>`);
      });
    } else {
      newText = text;
    }

    const emailAddresses: string[] = extractEmailAddresses(newText);
    if(emailAddresses.length > 0){
      emailAddresses.forEach((email, index) => {
        newText = newText.replace(email,`<a href='mailto:${email}'">${email}</a>`);
      });
    }

    newText = "<div>" + newText + "</div>";
    
    return newText;
  } else {
    return text;
  }
}