import { HomeScreen,SplashScreen, MenuScreen, AddTransScreen, ArticlesScreen, InfoScreen, SignInScreen, SignUpScreen } from '../screens'

import { createStackNavigator } from 'react-navigation'


export const Root = createStackNavigator(
    {
        Splash: SplashScreen,
        Home: ArticlesScreen,
        Menu: MenuScreen,
        Info: InfoScreen,
        AddTrans : AddTransScreen,
        Articles : ArticlesScreen,
        SignIn : SignInScreen,
        SignUp : SignUpScreen
    }, {
        initialRouteName: 'SignIn',
        navigationOptions: {
            header : null
        }
    }
)