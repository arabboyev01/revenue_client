import { useCallback, useEffect, useState } from "react"
import { api } from "./api"
import { useRouter } from "next/router"

export default function Home() {

    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [isLogged, setLogged] = useState(true)

    const getUser = useCallback(() => {
        setLoading(true)
        api.getData('user').then((data) => {
            if (data.success) {
                setLoading(false)
                setLogged(true)

                if (data.data.role === 'admin') {
                    router.push('/admin')
                }

                if (data.data.role === 'staff') {
                    router.push('/staff')
                }
            }
            if (!data.success) {
                setLogged(false)
            }
        })
    }, [router])

    useEffect(() => {
        getUser()
    }, [getUser])

    if (!isLogged) {
        router.push('/login')
    }

    return (
        <div>
            {loading && <h1>loading...</h1>}
        </div>
    )
}