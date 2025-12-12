export const getFilesForUser = async() => {
    const url = `${import.meta.env.VITE_API_HOST}/api/fileApi`;
    const res = await fetch(url, {
         credentials: "include" 
        });
    
    return res;
}