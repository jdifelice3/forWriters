import { useState } from "react";
import { Group } from "../../../backend/src/domain-types";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface Props {
  onSelectGroup: (group: Group | null) => void;
}

export default function GroupSearchBox({ onSelectGroup }: Props) {
  const [options, setOptions] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

const searchUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/groups/search/search?query=`;

  const handleInput = async (query: string) => {
    console.log('in handleInput');
    console.log('query', query);
    if (!query) {
      setOptions([]);
      return;
    }
    console.log('before setLoading');
    setLoading(true);
    
    try {
      const res = await fetch(`${searchUrl}${encodeURIComponent(query)}`,
        { 
          method: "GET", 
          headers: { "Content-Type": "application/json" },
          credentials: "include" 
        }
      );
      console.log('req', )
      console.log('res', res);
      const data = await res.json();
      console.log('data', data)
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
          label="Search for writing groups"
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
