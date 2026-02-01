import React, { useState, ChangeEvent } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { CommentsForDisplay } from "../../types/FeedbackTypes";

interface ReviewerRadioListProps {
    reviewers: Record<string, CommentsForDisplay[]>;
    selectedReviewer: string | undefined;
    onChange: (value: string) => void;
}
const ReviewerRadioList: React.FC<ReviewerRadioListProps> = ({ reviewers, selectedReviewer, onChange }) => {

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
};

return (
    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        <FormLabel component="legend">Select a reviewer</FormLabel>
        <RadioGroup
            value={selectedReviewer ?? ""}
            onChange={handleChange}
        >
            <FormControlLabel
                key="selectall"
                value="selectall"
                control={<Radio />}
                label={"Select All"}
            />
            {Object.entries(reviewers).map(([key, value]) => (
                <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio />}
                    label={key}
                />
            ))}
        </RadioGroup>
    </div>
  );
};

export default ReviewerRadioList;
