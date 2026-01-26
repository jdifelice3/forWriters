import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { CommentsForDisplay } from "../../types/FeedbackTypes";

interface ReviewerRadioListProps {
    reviewers: Record<string, CommentsForDisplay[]>;
    onClick: (value: string) => void;
}
const ReviewerRadioList: React.FC<ReviewerRadioListProps> = ({ reviewers, onClick }) => {
  return (
    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
      <FormLabel component="legend">Select a reviewer</FormLabel>
      <RadioGroup>
        {Object.entries(reviewers).map(([key, value]) => (
            <FormControlLabel 
                key={key}
                value={key} 
                control={<Radio />} 
                label={key} 
                onClick={() => onClick(key)}
            />
        ))}
      </RadioGroup>
    </div>
  );
};

export default ReviewerRadioList;
