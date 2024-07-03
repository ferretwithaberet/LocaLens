import { View, Button, Colors, ViewProps } from "react-native-ui-lib";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faExclamationTriangle as falExclamationTriangle,
  faQuestionCircle as falQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import { ReactNodeOrComponent } from "@/utils/types";
import { renderComponentOrElement } from "@/utils/components";
import LoaderView from "@/components/common/LoaderView";
import IconStateView from "@/components/common/IconStateView";

type QueryStateViewProps = Omit<ViewProps, "children"> & {
  isLoading?: boolean;
  isError?: boolean;
  errorTitle?: string;
  errorDescription?: string;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  header?: ReactNodeOrComponent;
  showRefresh?: boolean;
  onRefresh?: () => void;
  children?: ReactNodeOrComponent;
};

const QueryStateView = (props: QueryStateViewProps) => {
  const {
    isLoading = false,
    isError = false,
    errorTitle = "Eroare!",
    errorDescription = "Eroare necunoscută",
    isEmpty = false,
    emptyTitle = "Nu există!",
    emptyDescription = "Se pare că nu există resurse de afișat",
    header,
    showRefresh = false,
    onRefresh,
    children,
    ...restProps
  } = props;

  const refreshButton = <Button label="Reîncearcă" onPress={onRefresh} />;

  return (
    <View flex {...restProps}>
      {isLoading ? (
        <LoaderView />
      ) : (
        <>
          {renderComponentOrElement(header)}

          {isError ? (
            <IconStateView
              title={errorTitle}
              titleColor={Colors.$textDanger}
              description={errorDescription}
              icon={
                <FontAwesomeIcon
                  icon={falExclamationTriangle}
                  size={128}
                  color={Colors.$iconDangerLight}
                />
              }
            >
              {showRefresh ? refreshButton : null}
            </IconStateView>
          ) : isEmpty ? (
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
            >
              {showRefresh ? refreshButton : null}
            </IconStateView>
          ) : (
            renderComponentOrElement(children, {})
          )}
        </>
      )}
    </View>
  );
};

export default QueryStateView;
