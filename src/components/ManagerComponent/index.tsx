import { api } from "@/pages/api"
import { FormEvent, useCallback, useEffect, useState } from "react"
import { UserTypes } from "../types"

const ManagerComponent = () => {

    const [data, setData] = useState<UserTypes|null>(null)
    const [point, setPoint] = useState('')
    const [revenue, setRevenue] = useState('')
    const [error, setError] = useState('')

    const getUser = useCallback(() => {
        api.getWithToken('user').then((data) => data?.success && setData(data?.data))
    }, [])

    useEffect(() => {
        getUser()
    }, [getUser])


    const handleSubmitRevenue = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const payload = {
            managerName: data?.fullName,
            pointAddress: point,
            revenuePerDay: revenue,
        }

        api.postWithToken('revenues', payload).then((data) => {
            if(!data?.success) setError(data?.message)
            if(data?.success) {
                setError('')
                setPoint('')
                setRevenue('')
            }
        })
    }

    if(!data) return <h1>You are forbiddin to see the page</h1>

    return (
        <div className="staff-container">
            <h1 className="header">Hello, {data?.fullName}</h1>
            <form className="forms" onSubmit={handleSubmitRevenue}>
                <input type="text" name="point_address" placeholder="Point address" value={point} onChange={(e) => setPoint(e.target.value)}/>
                <input type="number" name="revenue" placeholder="Revenue per day" value={revenue} onChange={(e) => setRevenue(e.target.value)}/>
                <button className="primary-button" type="submit">Submit</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    )
}
export default ManagerComponent