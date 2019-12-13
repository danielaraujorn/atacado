import React from 'react';
import { Button, View, Text } from 'native-base';
import theme from '../../theme';

export const ButtonComponent = ({
  inside,
  style,
  showBadge,
  badgeNumber,
  ...props
}) => (
  <View
    style={{
      flexDirection: 'row-reverse',
    }}
  >
    <Button
      {...props}
      style={
        inside
          ? {
              borderRadius: 30,
              width: '100%',
              height: 54,
              justifyContent: 'center',
              ...style,
            }
          : style
      }
    />
    {!!showBadge && (
      <View
        style={{
          margin: 2,
          backgroundColor: theme.brandDark,
          height: 20,
          minWidth: 20,
          paddingHorizontal: 4,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}
      >
        <Text style={{ color: theme.brandLight, fontSize: 12 }}>
          {badgeNumber}
        </Text>
      </View>
    )}
  </View>
);
