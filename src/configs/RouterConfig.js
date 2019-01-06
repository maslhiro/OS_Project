import { HomeScreen,SplashScreen, MenuScreen, AddTransScreen, ArticlesScreen, InfoScreen, SignInScreen } from '../screens'

import { createStackNavigator } from 'react-navigation'


export const Root = createStackNavigator(
    {
        Splash: SplashScreen,
        Home: ArticlesScreen,
        Menu: MenuScreen,
        Info: InfoScreen,
        AddTrans : AddTransScreen,
        Articles : ArticlesScreen,
        SignIn : SignInScreen
    }, {
        initialRouteName: 'SignIn',
        navigationOptions: {
            header : null
        }
    }
)