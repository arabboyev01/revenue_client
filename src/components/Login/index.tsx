import { api } from '@/pages/api';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react'

const Login = () => {

    const router = useRouter()

    const [username, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [remember, setRemember] = useState(false)


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        api.postData('login', { username, password, remember }).then((data) => {
            if (!data.success) setError(data.message)
            else {
                localStorage.setItem('token', data.token)
                setError('')
                router.push(`/${data.role}`)
            }
        })
    }

    return (
        <div className='login-page'>
            <div className="login-container">
                <h2 className='login'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Username:</label>
                        <input
                            type="text"
                            id="email"
                            value={username}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className='error-message'>{error}</p>}
                    <button type="submit" className='login-button'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
