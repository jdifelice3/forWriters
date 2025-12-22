import { useState } from "react";
import { Group } from "../../types/domain-types";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface Props {
  onSelectGroup: (group: Group | null) => void;
}

export default function GroupSearchBox({ onSelectGroup }: Props) {
  const [options, setOptions] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

const searchUrl = `${import.meta.env.VITE_API_HOST}/api/groups/search/search?query=`;

  const handleInput = async (query: string) => {
    if (!query) {
      setOptions([]);
      return;
    }
    setLoading(true);
    
    try {
      const res = await fetch(`${searchUrl}${encodeURIComponent(query)}`,
        { 
          method: "GET", 
          headers: { "Content-Type": "application/json" },
          credentials: "include" 
        }
      );
      const data = await res.json();
      setOptions(data || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      options={options}
      fullWidth
      loading={loading}
      getOptionLabel={(opt) => opt.name}
      onInputChange={(_, value) => handleInput(value)}
      onChange={(_, value) => onSelectGroup(value)}
      renderInput={(params) => (
        <TextField
          {...params}
        //   label="Search for writing groups"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
