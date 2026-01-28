import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

interface ReviewerCheckboxListProps {
  reviewers: string[];
  selectedReviewers: string[];
  onChange: (selected: string[]) => void;
}

const ReviewerCheckboxList: React.FC<ReviewerCheckboxListProps> = ({
  reviewers,
  selectedReviewers,
  onChange,
}) => {
  const allChecked = reviewers.length > 0 && selectedReviewers.length === reviewers.length;
  const partiallyChecked =
    selectedReviewers.length > 0 && !allChecked;

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked ? reviewers : []);
  };

  const handleToggleReviewer = (reviewer: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      onChange([...selectedReviewers, reviewer]);
    } else {
      onChange(selectedReviewers.filter(r => r !== reviewer));
    }
  };

  return (
    <div style={{ maxHeight: '200px', width: "200px", overflowY: 'auto'}}>
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Select reviewers</FormLabel>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={allChecked}
              indeterminate={partiallyChecked}
              onChange={handleCheckAll}
            />
          }
          label="Check All"
        />

        {reviewers.map(reviewer => (
          <FormControlLabel
            key={reviewer}
            control={
              <Checkbox
                checked={selectedReviewers.includes(reviewer)}
                onChange={handleToggleReviewer(reviewer)}
              />
            }
            label={reviewer}
          />
        ))}
      </FormGroup>
    </FormControl>
    </div>
  );
};

export default ReviewerCheckboxList;
