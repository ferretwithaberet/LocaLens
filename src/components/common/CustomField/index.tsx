import React from "react";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";

type CustomFieldProps = {
  label?: string;
  showClear?: boolean;
  onClear?: () => void;
  children?: React.ReactNode;
};

const CustomField = (props: CustomFieldProps) => {
  const { label, showClear = false, onClear, children } = props;

  return (
    <View gap-s2>
      <View row>
        <View flex>
          <Text text60BO>{label}</Text>
        </View>

        {showClear ? (
          <TouchableOpacity onPress={() => onClear?.()}>
            <Text $textPrimary>Șterge</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View>{children}</View>
    </View>
  );
};

export default CustomField;
