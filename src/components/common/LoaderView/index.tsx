import { ActivityIndicator } from "react-native";
import { View, Text, Colors, Spacings } from "react-native-ui-lib";

const LoaderView = (props) => {
  const { style, color = Colors.$textNeutral, ...restProps } = props;

  return (
    <View
      style={[{ gap: Spacings.s3 }, style]}
      padding-s3
      flex
      centerV
      centerH
      {...restProps}
    >
      <ActivityIndicator size={64} color={Colors.$iconPrimary} />

      <Text text60 color={color}>
        Se încarcă...
      </Text>
    </View>
  );
};

export default LoaderView;
