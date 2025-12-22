export const getFilesForUser = async() => {
    const url = `${import.meta.env.VITE_API_HOST}/api/filesApi`;
    const res = await fetch(url, {
         credentials: "include" 
        });
    
    return res;
}