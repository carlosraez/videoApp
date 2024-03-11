import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/home/Home";
import { VideoDetailsScreen } from "../screens/VideoDetailScreen";

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={VideoDetailsScreen} />
    </Stack.Navigator>
  );
};