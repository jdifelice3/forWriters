import React, { useState, useEffect } from "react";
import { Box, TextField, Select, MenuItem, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { UserSearch } from "../types/domain-types";

type UserRow = {
  user: string;
};

interface UserListProps {
    selectedUser: UserSearch | null;
}

export const UserList: React.FC<UserListProps> = ({selectedUser}) => {
    if(!selectedUser) return;
  const [rows, setRows] = useState<UserRow[]>([]);

      useEffect(() => {
        addRow(selectedUser.fullName!);
        updateRow
        
      },[]);

  const addRow = (userName: string) => {
    setRows([...rows, { user: ""}]);
  };

  const updateRow = (index: number, field: keyof UserRow, value: string) => {
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
        <Box 
          key={i}
          display="flex"
          gap={2}
          alignItems="center"
        >
          {/* User TextField */}
          <TextField
            label="Author"
            fullWidth
            value={row.user}
            onChange={(e) => updateRow(i, "user", e.target.value)}
          />

          {/* Delete row button */}
          <IconButton
            onClick={() => removeRow(i)}
            // disabled={rows.length === 1}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      
    </Box>
  );
}
export default UserList;