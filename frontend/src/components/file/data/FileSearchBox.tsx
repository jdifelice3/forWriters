import { useState } from "react";
import { AppFile, AppFileMeta } from "../../../types/domain-types";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface Props {
  onSelectFile: (file: AppFile | null) => void;
}

export default function GroupSearchBox({ onSelectFile: onSelectFile }: Props) {
  const [options, setOptions] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);

const searchUrl = `${import.meta.env.VITE_API_HOST}/api/filesApi/search?query=`;

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
console.log('options', options);
  return (
    <Autocomplete
      options={options}
      fullWidth
    //   loading={loading}
      getOptionLabel={(opt) => opt.name}
      onInputChange={(_, value) => handleInput(value)}
      onChange={(_, value) => onSelectFile(value)}
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
