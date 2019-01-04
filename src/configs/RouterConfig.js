import { HomeScreen,SplashScreen } from '../screens'

import { createStackNavigator } from 'react-navigation'


export const Root = createStackNavigator(
    {
        Splash: SplashScreen,
        Home: HomeScreen,
    }, {
        initialRouteName: 'Splash',
        navigationOptions: {
            header : null
        }
    }
)