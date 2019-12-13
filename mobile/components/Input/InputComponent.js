import React from 'react';
import { Input, Fab, Icon, View } from 'native-base';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
export const InputComponent = ({ label, light, rightButton, ...props }) => {
  return (
    <View>
      <LinearGradient
        colors={
          light
            ? ['#FFFFFF33', '#FFFFFF44']
            : [theme.brandPrimary + 'FF', theme.brandPrimary + 'DD']
        }
        useAngle
        angle={45}
        rounded
        style={{
          borderColor: 'none',
          paddingLeft: 20,
          outline: 'none',
          height: 54,
          borderRadius: theme.borderRadius,
          shadowColor: '#000',
          justifyContent: 'center',
        }}
      >
        <Input
          placeholderTextColor='#FFFFFFDD'
          style={{ color: 'white', paddingRight: rightButton ? 90 : undefined }}
          {...props}
        />
      </LinearGradient>
      {!!rightButton && !!rightButton.Fab && !!rightButton.Icon && (
        <Fab {...rightButton.Fab} position='topRight'>
          <Icon {...rightButton.Icon} />
        </Fab>
      )}
    </View>
  );
};
