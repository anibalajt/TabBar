import React, { } from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"

import Page1 from '../components/page1.js'
import Page2 from '../components/page2.js'
import Tabbar from "../components/tabbar/index"

const TabNavigator = createBottomTabNavigator(
    {
        HomeScreen: {
            screen: Page1
        },
        SearchScreen: {
            screen: Page2
        },
        FavoritesScreen: {
            screen: Page1
        },
        ProfileScreen: {
            screen: Page2
        },
        ProfileScreen2: {
            screen: Page1
        }
    },
    {
        tabBarComponent: props => (
            <Tabbar {...props} />
        ),
        tabBarOptions: {
            activeTintColor: "#eeeeee",
            inactiveTintColor: "#222222"
        }
    },

);

export default createAppContainer(TabNavigator);