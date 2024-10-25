import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import React from 'react'

const Home = () => {

    const { isSignedIn } = useAuth()

    if (isSignedIn) {
        return <Redirect href="/(root)/home" />
    }

    return <Redirect href="/(auth)/sign-up" />
}

export default Home