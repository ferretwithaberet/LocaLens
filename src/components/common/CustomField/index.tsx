import React from "react";
import { View, Text } from "react-native-ui-lib";

type CustomFieldProps = {
  label?: string;
  children?: React.ReactNode;
};

const CustomField = (props: CustomFieldProps) => {
  const { label, children } = props;

  return (
    <View gap-s2>
      <Text text60BO>{label}</Text>

      <View>{children}</View>
    </View>
  );
};

export default CustomField;
