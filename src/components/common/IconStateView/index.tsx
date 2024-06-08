import { View, Text, Spacings, Colors, ViewProps } from "react-native-ui-lib";

import { ReactNodeOrComponent } from "@/utils/types";
import { renderComponentOrElement } from "@/utils/components";

type IconStateViewProps = ViewProps & {
  title?: string;
  description?: string;
  titleColor?: string;
  icon?: ReactNodeOrComponent;
};

const IconStateView = (props: IconStateViewProps) => {
  const {
    style,
    title,
    description,
    titleColor = Colors.$textPrimary,
    icon = null,
    children,
    ...restProps
  } = props;

  return (
    <View
      style={[{ gap: Spacings.s3 }, style]}
      padding-s3
      flex
      centerV
      centerH
      {...restProps}
    >
      {renderComponentOrElement(icon)}

      <Text center text50 color={titleColor}>
        {title}
      </Text>

      <Text center text70 $textDefault>
        {description}
      </Text>

      {children}
    </View>
  );
};

export default IconStateView;
