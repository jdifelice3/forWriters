import React from "react";
import { Reading, ReadingAuthor } from "../../../backend/src/domain-types";
import {
  Typography,
} from "@mui/material";

interface AuthorListProps {
  reading: Reading;
}

const AuthorList: React.FC<AuthorListProps> = ({ reading }) => {
  return (
    reading.readingAuthor.map((ra: ReadingAuthor) => (
      <Typography variant="body2" color="text.secondary">
        {ra.userProfile.firstName} {ra.userProfile.lastName}
      </Typography>
    ))
  );
}

export default AuthorList;