import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Theme} from './home';
import {Task} from './task';

type Props = {
  theme: Theme;
  translations: {[key: string]: string};
};

const Stack = createNativeStackNavigator();

export const TodoApp = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="App">
          {navProps => <Home {...navProps} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Task">
          {navProps => <Task {...navProps} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
