import { User, UserProfile } from "../types/domain-types";
export function useUserDomain(
    user: User | undefined,
    //refresh: () => Promise<any>
) {
    const disabled = !user;
    const userId = user?.id;

    const getUserProfile = async() => {
        try {
            const res: Response = await fetch(`${import.meta.env.VITE_API_HOST}/api/users/userprofile`, {
                method: 'GET',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
            });

            const retrievedUser = await res.json();
            return retrievedUser.userProfile;
        } catch (err: unknown) {
            console.error('Error in updateUserProfile:', err);

            if(err instanceof Error){
                throw err; 
            } else {
                throw new Error('A non-Error-typed error occurred'); 
            }
        }
    }

    const updateUserProfile = async(userId: string, firstName: string, lastName: string) => {
        try {
            const res: Response = await fetch(`${import.meta.env.VITE_API_HOST}/api/users/userprofile`, {
                method: 'PUT',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userId: userId, firstName: firstName, lastName: lastName, bio: ""})
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

    return {
        getUserProfile,
        updateUserProfile
    }

}