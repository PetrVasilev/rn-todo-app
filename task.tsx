import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type Theme = {
  primary: ColorValue;
  secondary: ColorValue;
  textColor: ColorValue;
};

type Props = {
  route: any;
  theme: Theme;
  translations: {[key: string]: string};
};

export const Task = (props: Props) => {
  const styles = createStyles(props.theme);

  const task = props.route.params.task;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View key={task.id} style={styles.task}>
        <Text style={styles.taskIndex}>{task.index}. </Text>
        <Text style={styles.taskText}>{task.text}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      padding: 15,
    },
    button: {
      borderRadius: 10,
      paddingHorizontal: 15,
      height: 45,
      fontSize: 16,
      borderWidth: 1,
      borderColor: theme.primary,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      textTransform: 'uppercase',
      color: theme.textColor,
    },
    space: {
      width: 10,
    },
    task: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    taskIndex: {
      fontSize: 16,
      color: theme.secondary,
    },
    taskText: {
      fontSize: 16,
      color: '#000',
      flex: 1,
    },
  });
};
