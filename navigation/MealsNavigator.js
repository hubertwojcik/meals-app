import React from "react";
import { Platform, Modal } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import Colors from "../constans/Colors";

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
	},
	headerTitleStyle: {
		// fontFamily: "open-sans"
	},
	headerBackTitleStyle: {},
	headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
	headerTitle: "A Screen"
};

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoriesScreen
		},
		CategoryMeals: {
			screen: CategoryMealsScreen
		},
		MealDetail: MealDetailScreen
	},
	{
		defaultNavigationOptions: defaultStackNavOptions
	}
);

const FavNavigator = createStackNavigator(
	{
		Favorites: FavoritesScreen,
		MealDetail: MealDetailScreen
	},
	{
		defaultNavigationOptions: defaultStackNavOptions
	}
);

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => (
				<Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
			)
		},
		tabBarColor: Colors.secondaryColor,
		tabBarLabel: "Meals!"
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.secondaryColor
		}
	}
};

const MealsFavTabNavigator =
	Platform.OS === "android"
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: "white",
				shifting: true,
				barStyle: {
					backgroundColor: Colors.primaryColor
				}
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					labelStyle: {
						// fontFamily: "open-sans-bold"
					},
					activeTintColor: Colors.secondaryColor
				}
		  });

const FiltersNavigator = createStackNavigator(
	{
		Filters: FiltersScreen
	},
	{
		// navigationOptions: {
		// 	drawerLabel: "Filters!!"
		// },
		defaultNavigationOptions: defaultStackNavOptions
	}
);

const MainNavigator = createDrawerNavigator(
	{
		MealsFav: {
			screen: MealsFavTabNavigator,
			navigationOptions: {
				drawerLabel: "Meals"
			}
		},
		Filters: FiltersNavigator
	},
	{
		contentOptions: {
			activeTintColor: Colors.secondaryColor
		}
	}
);

export default createAppContainer(MainNavigator);
