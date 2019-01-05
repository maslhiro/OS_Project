import { HomeScreen,SplashScreen,StatisticsScreen, SettingScreen, MenuScreen, AddTransScreen } from '../screens'

import { createStackNavigator } from 'react-navigation'


export const Root = createStackNavigator(
    {
        Splash: SplashScreen,
        Home: HomeScreen,
        Statistics : StatisticsScreen,
        Setting : SettingScreen,
        Menu: MenuScreen,
        AddTrans : AddTransScreen
    }, {
        initialRouteName: 'Splash',
        navigationOptions: {
            header : null
        }
    }
)