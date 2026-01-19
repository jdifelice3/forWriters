import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  useTheme
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from '@mui/material/Tooltip';
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  RichTextReadOnly,
} from "mui-tiptap";
import Editor from "../richTextEditor/Editor";
import useExtensions from "../richTextEditor/useExtensions";

interface NewsFeedProps {
  groupId: string;
  isAdmin: boolean;
}

interface NewsItem {
  id: string;
  content?: string;
  postedAt: string;
  archived: boolean;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ groupId, isAdmin }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [adding, setAdding] = useState(false);
  const [newsContent, setNewsContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const extensions = useExtensions({
        placeholder: "Add your own content here...",
  });

  const theme = useTheme();
  const newsUrl = `${import.meta.env.VITE_API_HOST}/api/groups/${groupId}/news`;
  const newsArchiveUrl = `${import.meta.env.VITE_API_HOST}/api/groups/${groupId}/news`;
  
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

  const postContent = async (content: string) => {
    console.log(content);
    setNewsContent(content);
    setError("");
    
    if(content === "<p></p>" || content.length === 0){
        setError("You must provide content for a News post.");
        return;
    } 

    const res = await fetch(newsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content }),
      credentials: "include",
    });

    if (res.ok) {
      const newsItem = await res.json();
      setNews((prev) => [newsItem, ...prev]);
      setNewsContent("");
      setAdding(false);
    }
  };

  const cancelPost = () => {
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
          News
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
        <Box sx={{ borderBottom: "1px solid #ccc" }}/>
        {isAdmin && adding && (
          <Box mb={3}>
             <Box mt={3}>
                        {error && (
                             <Alert severity="error" sx={{ mt: 3 }}>
                                {error}
                            </Alert>
                        )}
                    </Box>

            <Box sx={{ maxWidth: 1207, margin: "0 auto" }}>
                <Editor postContent={postContent} cancelPost={cancelPost}/>
            </Box>              
          </Box>
        )}
        {news.length === 0 ? (
            <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
              No news is good news
            </Typography>
        ) : ( 
            <>
        {news.map((n) => (
          <Box key={n.id} mb={2} p={1} sx={{ borderBottom: "1px solid #ccc" }}>
            <Stack direction="row" justifyContent="space-between">
              {isAdmin && (
                <IconButton size="small" onClick={() => handleArchive(n.id)}>
                  <Tooltip title="archive">
                  <ArchiveIcon fontSize="small" />
                  </Tooltip>
                </IconButton>
              )}
            </Stack>
            <RichTextReadOnly
              content={n.content}
              extensions={extensions}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Posted on {new Date(n.postedAt).toLocaleDateString()}
            </Typography>
          </Box>
        ))}
        </>
)}
      </CardContent>
    </Card>
  );
};
