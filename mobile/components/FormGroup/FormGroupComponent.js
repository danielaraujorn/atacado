import React from 'react';
import { Content } from 'native-base';

export const FormGroupComponent = ({ style = {}, ...props }) => (
  <Content
    {...props}
    contentContainerStyle={{
      padding: 25,
      ...style,
    }}
  />
);
