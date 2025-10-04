import React from 'react';
import { useEffect } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  interpolateColor
} from 'react-native-reanimated'; // Anotação: npx expo install react-native-reanimated react-native-worklets, em https://docs.expo.dev/versions/latest/sdk/reanimated/ e https://docs.swmansion.com/react-native-reanimated/ 

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

import { THEME } from '../../styles/theme';
import { styles } from './styles';

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {
  // Anotação: é necessário para definir valores que serão usados pelas animações
  const scale = useSharedValue(1);
  const checked = useSharedValue(1);

  const COLOR = TYPE_COLORS[type];

  // Anotação: useAnimatedStyle permite fazer animações de estilo em um componente
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ['transparent', COLOR]
      )
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [COLOR, THEME.COLORS.GREY_100]
      )
    }
  })

  function onPressIn() {
    scale.value = withTiming(1.2);
  }

  function onPressOut() {
    scale.value = withTiming(1);
  }

   useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0);
  },[isChecked])

  return (
    <PressableAnimated 
      onPressIn={onPressIn} 
      onPressOut={onPressOut} 
      style={[ styles.container, { borderColor: COLOR }, animatedContainerStyle ]} 
      {...rest}
    >
      <Animated.Text style={
        [
          styles.title,
          animatedTextStyle
        ]}>
        {title}
      </Animated.Text>
    </PressableAnimated>
  );
}