import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native-ui-lib";

export type TouchableLinkProps = Omit<TouchableOpacityProps, "children"> & {
  children?: string;
  textProps?: Omit<TextProps, "children">;
};

const TouchableLink = (props: TouchableLinkProps) => {
  const { textProps, children, ...restProps } = props;

  return (
    <TouchableOpacity {...restProps}>
      <Text {...textProps} $textPrimary>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default TouchableLink;
