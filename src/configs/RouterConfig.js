import { HomeScreen,SplashScreen, MenuScreen, ArticlesScreen, InfoScreen, SignInScreen, SignUpScreen, SetInfoScreen, PostScreen, ProfileScreen, CommentScreen } from '../screens'

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
        Profile : ProfileScreen,
        Comment : CommentScreen
    }, {
        initialRouteName: 'Splash',
        navigationOptions: {
            header : null
        }
    }
)