import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
import TipTapTextEditor from "../TipTapTextEditor";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from '@mui/material/Tooltip';
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField,
} from "mui-tiptap";

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
  const [newsContent, setNewsContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const newsUrl = `${import.meta.env.VITE_API_HOST}/api/groups/${groupId}/news`;
  const newsArchiveUrl = `${import.meta.env.VITE_API_HOST}/api/groups/news`;
  
  const editor = useEditor({
    extensions: [
        StarterKit
    ],
    editable: true,
    onUpdate: ({ editor }) => {
        setNewsContent(editor.getHTML());
    },
  });

  useEffect(() => {
    
    fetch(newsUrl, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setNews(data))
      .catch(console.error);

  }, [groupId]);

  const handleAddNews = async () => {
    setNewsContent(editor.getHTML());
    setError("");

    if(newsContent === "<p></p>" || newsContent.length === 0){
        console.log('in newsContent check');
        setError("You must provide content for a News post.");
        return;
    } 
    if (title.length === 0){
        console.log('in title check');
        setError("You must provide a title for a News post.");
        return;
    } 
    

    const res = await fetch(newsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content: newsContent }),
      credentials: "include",
    });

    if (res.ok) {
      const newsItem = await res.json();
      setNews((prev) => [newsItem, ...prev]);
      setTitle("");
      setNewsContent("");
      setAdding(false);
    }
  };

  const handleOnCancel = async () => {
    setTitle("");
    setNewsContent("");
    setAdding(false);
    setError("");
  }

  const handleArchive = async (id: string) => {
    const res = await fetch(`${newsArchiveUrl}/${id}/archive`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
             <Box mt={3}>
                        {error && (
                             <Alert severity="error" sx={{ mt: 3 }}>
                                {error}
                            </Alert>
                        )}
                    </Box>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
          />
        <RichTextEditorProvider editor={editor}>
      <RichTextField sx={{ height: "300px" }}
        controls={
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            {/* Add more controls here */}
          </MenuControlsContainer>
        }
      />
    </RichTextEditorProvider>                   

            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={handleAddNews}>
                Post
              </Button>
              <Button onClick={handleOnCancel}>Cancel</Button>
            </Stack>
          </Box>
        )}

        {news.map((n) => (
          <Box key={n.id} mb={2} p={1} sx={{ borderBottom: "1px solid #ccc" }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" style={{fontWeight: "bold"}}>
                {n.title}
              </Typography>
              {isAdmin && (
                <IconButton size="small" onClick={() => handleArchive(n.id)}>
                  <Tooltip title="archive">
                  <ArchiveIcon fontSize="small" />
                  </Tooltip>
                </IconButton>
              )}
            </Stack>
            <TipTapTextEditor initialContent={n.content || ""} editable={false} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Posted on {new Date(n.postedAt).toLocaleDateString()}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};
