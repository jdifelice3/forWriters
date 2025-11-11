export const getUserProfile = async(authId: string) => {
  try {
      const res: Response = await fetch(`${process.env.VITE_API_HOST}:${process.env.VITE_API_PORT}/api/userProfile?authId=${authId}`, {
        method: 'GET',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
      });

      return await res.json();
  } catch (err: unknown) {
    console.error('Error in updateUserProfile:', err);

    if(err instanceof Error){
      throw err; 
    } else {
      throw new Error('A non-Error-typed error occurred'); 
    }
  }
}

export const updateUserProfile = async(userId: string, firstName: string, lastName: string, bio: string) => {
  try {
    const res: Response = await fetch(`${process.env.VITE_API_HOST}:${process.env.VITE_API_PORT}/api/userProfile`, {
      method: 'PUT',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userId: userId, firstName: firstName, lastName: lastName, bio: bio})
    });

      return await res.json();
  } catch (err: unknown) {
    console.error('Error in updateUserProfile:', err);

    if(err instanceof Error){
      throw err; 
    } else {
      throw new Error('A non-Error-typed error occurred'); 
    }
  }
}