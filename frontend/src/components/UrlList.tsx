import React, { useState } from "react";
import { UrlType } from "../../../backend/src/domain-types";
import { Box, TextField, Select, MenuItem, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

type UrlRow = {
  url: string;
  type: UrlType;
};

interface UrlListProps {
    isDisabled: boolean;
}

export const UrlList: React.FC<UrlListProps> = ({isDisabled}) => {
  const [rows, setRows] = useState<UrlRow[]>([

  ]);

  const addRow = () => {
    setRows([...rows, { url: "", type: UrlType.WEBSITE }]);
  };

  const updateRow = (index: number, field: keyof UrlRow, value: any) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const removeRow = (index: number) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}
    >
      {rows.map((row, i) => (
        <Box className={isDisabled ? "disabled" : ""}
          key={i}
          display="flex"
          gap={2}
          alignItems="center"
        >
          {/* URL TextField */}
          <TextField
            label="URL"
            fullWidth
            value={row.url}
            onChange={(e) => updateRow(i, "url", e.target.value)}
          />

          {/* Select populated by enum */}
          <Select
            value={row.type}
            onChange={(e) => updateRow(i, "type", e.target.value as UrlType)}
            sx={{ minWidth: 150 }}
          >
            {Object.values(UrlType).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>

          {/* Delete row button */}
          <IconButton
            onClick={() => removeRow(i)}
            // disabled={rows.length === 1}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      {/* Add row button */}
      <Button 
        variant="outlined" 
        startIcon={<AddIcon/>}
        onClick={addRow}
        sx={{width: 130}}
        disabled={isDisabled}
    >
        Add Url
      </Button>

      {/* For debugging: */}
      {/* <pre>{JSON.stringify(rows, null, 2)}</pre> */}
    </Box>
  );
}
export default UrlList;