import { ActivityIndicator, FlatListProps, RefreshControl } from "react-native";
import { View, Text, Colors, Spacings } from "react-native-ui-lib";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQuestionCircle as falQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import { renderComponentOrElement } from "@/utils/components";
import IconStateView from "@/components/common/IconStateView";

type FlatListLoaderProps = {
  isLoading?: boolean;
};

export const FlatListLoader = (props: FlatListLoaderProps) => {
  const { isLoading = false } = props;

  if (!isLoading) return null;

  return (
    <View style={{ gap: Spacings.s3 }} flex row centerV centerH margin-s4>
      <ActivityIndicator size="large" color={Colors.$iconPrimary} />

      <Text $textNeutral>Se încarcă...</Text>
    </View>
  );
};

type FlatListEmptyComponentProps = {
  emptyTitle?: string;
  emptyDescription?: string;
};

export const FlatListEmptyComponent = (props: FlatListEmptyComponentProps) => {
  const { emptyTitle, emptyDescription } = props;

  return (
    <IconStateView
      title={emptyTitle}
      description={emptyDescription}
      icon={
        <FontAwesomeIcon
          icon={falQuestionCircle}
          size={128}
          color={Colors.$iconPrimary}
        />
      }
    />
  );
};

type UseFlatListProps = Partial<FlatListProps<any>> & {
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  pullToRefresh?: boolean;
  onRefresh?: () => void;
};

const defaultListEmptyComponent = (props: FlatListEmptyComponentProps) => (
  <FlatListEmptyComponent {...props} />
);
const defaultListFooterComponent = (props: FlatListLoaderProps) => (
  <FlatListLoader {...props} />
);
export const useFlatListProps = (props: UseFlatListProps = {}) => {
  const {
    isLoading = false,
    emptyTitle = "Nu există",
    emptyDescription = "Se pare că nu există resurse de afișat",
    pullToRefresh = false,
    onEndReachedThreshold = 1,
    ListEmptyComponent = defaultListEmptyComponent,
    ListFooterComponent = defaultListFooterComponent,
    onRefresh,
    ...restProps
  } = props;

  const refreshControl = (
    <RefreshControl
      enabled={pullToRefresh}
      refreshing={false}
      onRefresh={onRefresh}
    />
  );

  const flatListProps = {
    onEndReachedThreshold,
    // @ts-ignore
    ListEmptyComponent: renderComponentOrElement(ListEmptyComponent, {
      emptyTitle,
      emptyDescription,
    }),
    // @ts-ignore
    ListFooterComponent: renderComponentOrElement(ListFooterComponent, {
      isLoading,
    }),
    refreshControl,
  };

  return [flatListProps, restProps];
};
