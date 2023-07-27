import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ColorValue,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export type Theme = {
  primary: ColorValue;
  secondary: ColorValue;
  textColor: ColorValue;
};

type Props = {
  theme: Theme;
  translations: {[key: string]: string};
};

type Task = {
  id: string;
  text: string;
};

export const Home = (props: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState<string>('');

  const styles = createStyles(props.theme);

  const navigation = useNavigation();

  const handleAddTask = () => {
    if (!value) {
      return;
    }
    setTasks(prev => [
      ...prev,
      {id: new Date().valueOf().toString(), text: value},
    ]);
    setValue('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder={props.translations['input.placeholder']}
          style={styles.input}
          value={value}
          onChangeText={val => setValue(val)}
        />
        <View style={styles.space} />
        <TouchableOpacity onPress={handleAddTask} style={styles.button}>
          <Text style={styles.buttonText}>
            {props.translations['button.title']}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {tasks.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate('Task', {
                task: {
                  id: item.id,
                  index: index.toString(),
                  text: item.text,
                },
              });
            }}
            key={item.id}
            style={styles.task}>
            <Text style={styles.taskIndex}>{index + 1}. </Text>
            <Text style={styles.taskText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      padding: 15,
    },
    form: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 15,
    },
    input: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.primary,
      paddingHorizontal: 15,
      height: 45,
      fontSize: 16,
      flex: 1,
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
