import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

export const useLogin = () => {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        const data = {
            email,
            password
        }

        axios.post('http://localhost:7070/api/auth/login', data, {
            headers: { 'Content-Type': "application/json" }
        })
            .then(response => {
                if (response.status === 200) {
                    const json = response.data
                    localStorage.setItem('user', JSON.stringify(json))
                    dispatch({ type: "LOGIN", payload: json })
                    setIsLoading(true)
                } else {
                    setIsLoading(false)
                    setError(response.message)
                }

            }).catch(error => {
                setIsLoading(false);
                if (error.response) {
                  setError(error.response.data.message)
                } else {
                  setError('An error occurred while trying to log in. Please try again later.')
                }
            })

    }

    return { login, isLoading, error }


}