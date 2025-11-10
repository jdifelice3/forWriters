export const getFilesForUser = async() => {
    const url = `${process.env.VITE_API_HOST}:${process.env.VITE_API_PORT}/api/files`;
    const res = await fetch(url, {
         credentials: "include" 
        });
    
    return res;
}