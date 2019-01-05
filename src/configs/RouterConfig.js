import { HomeScreen,SplashScreen,StatisticsScreen, SettingScreen, MenuScreen } from '../screens'

import { createStackNavigator } from 'react-navigation'


export const Root = createStackNavigator(
    {
        Splash: SplashScreen,
        Home: HomeScreen,
        Statistics : StatisticsScreen,
        Setting : SettingScreen,
        Menu: MenuScreen
    }, {
        initialRouteName: 'Splash',
        navigationOptions: {
            header : null
        }
    }
)