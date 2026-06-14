import { useEffect, useState } from "react"
import { getMe } from "../services/api.service"

export const useAuthUser = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getMe();
                if(data?.success) setUser(data.user)
            } catch (error) {
                setUser(null)
            } finally{
                setLoading(false)
            }
        }
        fetch()
    },[])

    return {user, loading}
}