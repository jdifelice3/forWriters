import React from "react";
import { Reading, ReadingAuthor } from "../../types/domain-types";
import {
  Typography,
} from "@mui/material";

interface AuthorListProps {
  reading: Reading;
}

const AuthorList: React.FC<AuthorListProps> = ({ reading }) => {
  return (
    reading.readingAuthor.map((ra: ReadingAuthor, index) => (
      <Typography key={index} variant="body1" color="text.secondary">        
            {ra.authorAppFile?.appFile.user.userProfile?.firstName} {ra.authorAppFile?.appFile.user.userProfile?.lastName}
      </Typography>
    ))
  );
}

export default AuthorList;