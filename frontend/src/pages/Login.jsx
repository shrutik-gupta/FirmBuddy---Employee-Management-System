import React, { useState } from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [text] = useTypewriter({
        words: [
            'FirmBuddy makes employee management easy',
            'Robust way to manage your employees',
            'One stop solution for employee management'
        ],
        loop: true,
        delaySpeed: 2000,
        typeSpeed: 50,
        deleteSpeed: 25
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/login',
                { email, password }
            )
            if (response.data.success) {
                login(response.data.user)
                localStorage.setItem('token', response.data.token)
                if (response.data.user.role === 'admin') {
                    navigate('/admin-dashboard')
                } else {
                    navigate('/employee-dashboard')
                }
            }
        } catch (error) {
            // Ensure error.response is available before accessing its properties
            if (error.response) {
                setError(error.response.data.error || 'Something went wrong, please try again.')
            } else {
                setError('Network error, please try again later.')
            }
        }
    }

    return (
        <div className='container flex flex-col justify-start items-center min-h-screen bg-[#FEF9E1] font-arima'>
            <div className="intro-text text-center w-3/4">
                <h1 className="text-4xl font-bold mt-10 mb-4 text-gray-800">
                    {text}
                    <Cursor cursorStyle="|" />
                </h1>
                <p className="text-xl text-gray-600">
                    Experience seamless employee management with FirmBuddy.
                </p>
            </div>
            <div className='login-box m-8 p-4 w-1/4 bg-[#E5D0AC] rounded'>
                <h1 className='text-2xl mb-4'>Login</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor="email" className='block text-gray-700'>Email</label>
                        <input
                            type="email"
                            className='w-full px-3 py-2 border mb-4'
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <label htmlFor="password" className='block text-gray-700'>Password</label>
                        <input
                            type="password"
                            className='w-full px-3 py-2 border mb-2'
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        />
                        <div className='mb-4'>
                            <a href="#" className='text-teal-600'>Forgot Password?</a>
                        </div>
                        <button
                            type='submit'
                            className="w-1/3 p-2 bg-[#A31D1D] text-white text-lg rounded-full hover:bg-[#6D2323] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div className="footer">
                &copy; 2025 FirmBuddy. All rights reserved.
            </div>
        </div>
    )
}

export default Login
