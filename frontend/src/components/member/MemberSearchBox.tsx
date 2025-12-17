import { useState } from "react";
import { UserSearch } from "../../types/domain-types";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface Props {
    onSelectMember: (user: UserSearch | null) => void;
}

const MemberSearchBox = ({ onSelectMember: onSelectMember }: Props) => {
    const [options, setOptions] = useState<UserSearch[]>([]);
    const [loading, setLoading] = useState(false);

    const searchUrl = `${import.meta.env.VITE_API_HOST}/api/users/search?query=`;

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
            getOptionLabel={(opt) => opt.fullName || ""}
            onInputChange={(_, value) => handleInput(value)}
            onChange={(_, value) => onSelectMember(value)}
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
export default MemberSearchBox;