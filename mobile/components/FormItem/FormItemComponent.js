import React from 'react';
import { View } from 'native-base';

export const FormItemComponent = ({
  last,
  topMargin,
  style = {},
  ...props
}) => (
  <View
    {...props}
    style={{
      marginTop: topMargin ? topMargin * 10 : 0,
      marginBottom: last ? 0 : 25,
      ...style,
    }}
  />
);
