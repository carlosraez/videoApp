import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/home/Home";
import { VideoDetailsScreen } from "../screens/videoDetail/VideoDetailScreen";

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="VideoDetailScreen" component={VideoDetailsScreen} />
    </Stack.Navigator>
  );
};
