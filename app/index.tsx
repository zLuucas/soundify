import { Redirect } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {

    // const { isSignedIn } = useAuth()

    // if (isSignedIn) {
    return <Redirect href="/(root)/home" />
    // }

    // return <Redirect href="/(auth)/welcome" />
}

export default Home