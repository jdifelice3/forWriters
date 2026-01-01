import React from "react";
import { Reading, ReadingParticipant } from "../../types/domain-types";
import {
  Typography,
} from "@mui/material";

interface AuthorListProps {
  reading: Reading;
}

const AuthorList: React.FC<AuthorListProps> = ({ reading }) => {
  return (
    reading.readingParticipant.map((rp: ReadingParticipant, index) => (
      <Typography key={index} variant="body1" color="text.secondary">        
            {rp.user.userProfile?.firstName} {rp.user.userProfile?.lastName}
      </Typography>
    ))
  );
}

export default AuthorList;