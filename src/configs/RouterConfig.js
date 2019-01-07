import { HomeScreen,SplashScreen, MenuScreen, ArticlesScreen, InfoScreen, SignInScreen, SignUpScreen, SetInfoScreen, PostScreen, ProfileScreen } from '../screens'

import { createStackNavigator } from 'react-navigation'


export const Root = createStackNavigator(
    {
        Splash: SplashScreen,
        Home: ArticlesScreen,
        Menu: MenuScreen,
        Info: InfoScreen,
        Articles : ArticlesScreen,
        SignIn : SignInScreen,
        SignUp : SignUpScreen,
        SetInfo : SetInfoScreen,
        Post : PostScreen,
        Profile : ProfileScreen
    }, {
        initialRouteName: 'Splash',
        navigationOptions: {
            header : null
        }
    }
)