import { HomeScreen,SplashScreen, MenuScreen, AddTransScreen, ArticlesScreen, InfoScreen } from '../screens'

import { createStackNavigator } from 'react-navigation'


export const Root = createStackNavigator(
    {
        Splash: SplashScreen,
        Home: ArticlesScreen,
        Menu: MenuScreen,
        Info: InfoScreen,
        AddTrans : AddTransScreen,
        Articles : ArticlesScreen
    }, {
        initialRouteName: 'Home',
        navigationOptions: {
            header : null
        }
    }
)