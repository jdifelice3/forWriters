import { useState } from "react";
import { UserSearch } from "../../types/domain-types";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface Props {
    onSelectMember: (user: UserSearch | null) => void;
    groupId: string | undefined;
}

const MemberSearchBox = ({ onSelectMember: onSelectMember, groupId }: Props) => {
    const [options, setOptions] = useState<UserSearch[]>([]);
    const [loading, setLoading] = useState(false);

    let searchUrl = `${import.meta.env.VITE_API_HOST}/api/users/search?query=`;

    const handleInput = async (query: string) => {
        if (!query) {
        setOptions([]);
        return;
        }
        setLoading(true);
        
        try {
            searchUrl = searchUrl + encodeURIComponent(query);
            if(groupId){
                searchUrl += `&groupId=${groupId}`;
            }
        const res = await fetch(`${searchUrl}`,
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
                    sx={{backgroundColor: "white"}}
                    placeholder="Type a name"
                    {...params}
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