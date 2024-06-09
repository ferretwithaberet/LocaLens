import { useMemo, forwardRef, Children, memo } from "react";
import {
  View,
  TextField,
  Picker as _Picker,
  Colors,
  PickerProps as _PickerProps,
  TextFieldProps,
  PickerItemsListProps,
  PickerValue,
} from "react-native-ui-lib";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronDown,
  faSearch,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  PickerItemProps,
  PickerMultiValue,
} from "react-native-ui-lib/src/components/picker/types";

type PickerInputProps = TextFieldProps & {
  selected: PickerValue;
};

export const PickerInput = memo((props: PickerInputProps) => {
  const { selected, ...restProps } = props;

  return (
    <TextField
      {...restProps}
      trailingAccessory={
        <FontAwesomeIcon icon={faChevronDown} color={Colors.$iconNeutral} />
      }
    />
  );
});

type PickerSearchProps = TextFieldProps & {
  onSearchChange?: (search: string) => void;
  onCustomSearchChange?: (search: string) => void;
};

export const PickerSearch = memo((props: PickerSearchProps) => {
  const { onSearchChange, onCustomSearchChange, ...restProps } = props;

  return (
    <View
      style={{ borderBottomWidth: 1, borderColor: Colors.$outlineDefault }}
      paddingH-s4
    >
      <TextField
        leadingAccessory={
          <View marginR-s2>
            <FontAwesomeIcon icon={faSearch} color={Colors.$iconPrimary} />
          </View>
        }
        onChangeText={onCustomSearchChange ?? onSearchChange}
        {...restProps}
      />
    </View>
  );
});

export const PickerItemSelectedComponent = memo(() => (
  <FontAwesomeIcon icon={faCheck} color={Colors.$iconPrimary} />
));

const PickerItem = (props: PickerItemProps) => {
  return (
    <_Picker.Item
      // @ts-ignore Wrong library type
      selectedIcon={() => <PickerItemSelectedComponent />}
      {...props}
    />
  );
};

const sortPickerChildren = (
  selectedValues: PickerMultiValue,
  child1: React.ReactNode,
  child2: React.ReactNode
) => {
  // @ts-ignore Typescript is being picky, this works
  if (child1?.props?.value && selectedValues.includes(child1.props.value))
    return -1;

  // @ts-ignore Typescript is being picky, this works
  if (child2?.props?.value && selectedValues.includes(child2.props.value))
    return 1;

  return 0;
};

export type PickerProps = _PickerProps & {
  renderPicker?: (props: any) => React.ReactElement;
  renderCustomSearch?: (props: any) => React.ReactElement;
  showSelectedAbove?: boolean;
  onCustomSearchChange?: (search: string) => void;
};

const defaultRenderPicker = (props: any) => <PickerInput {...props} />;
const defaultRenderCustomSearch = (props: any) => <PickerSearch {...props} />;
const Picker = forwardRef((props: PickerProps, ref) => {
  const {
    preset,
    value,
    label,
    placeholder,
    floatingPlaceholder,
    mode,
    topBarProps,
    showSelectedAbove = false,
    readonly = false,
    renderPicker = defaultRenderPicker,
    renderCustomSearch = defaultRenderCustomSearch,
    onCustomSearchChange,
    children,
    ...restProps
  } = props;

  const sortedChildren = useMemo(() => {
    if (!showSelectedAbove) return children;

    const valueArray =
      value != null ? (Array.isArray(value) ? value : [value]) : [];

    return Children.toArray(children).sort((a, b) =>
      sortPickerChildren(valueArray, a, b)
    );
  }, [value, children]);

  const renderPickerComponent = (
    selected: PickerValue,
    pickerLabel?: string
  ) => {
    const value =
      mode === _Picker.modes.MULTI && Array.isArray(selected)
        ? `${selected.length} selecții`
        : pickerLabel;

    return renderPicker({
      selected,
      value,
      preset,
      label,
      placeholder,
      floatingPlaceholder,
      readonly,
    });
  };

  const renderSearchComponent = (props: PickerItemsListProps) => {
    const { searchStyle, searchPlaceholder = "Caută", onSearchChange } = props;

    return renderCustomSearch({
      preset,
      style: searchStyle,
      placeholder: searchPlaceholder,
      onSearchChange,
      onCustomSearchChange,
    });
  };

  return (
    <View pointerEvents={readonly ? "none" : undefined}>
      {/* @ts-ignore Odd error that may never happen */}
      <_Picker
        {...restProps}
        ref={ref}
        preset={preset}
        value={value}
        label={label}
        placeholder={placeholder}
        floatingPlaceholder={floatingPlaceholder}
        mode={mode}
        topBarProps={{
          title: label ?? placeholder,
          doneLabel: "Gata",
          ...topBarProps,
        }}
        renderPicker={renderPickerComponent}
        renderCustomSearch={renderSearchComponent}
      >
        {sortedChildren}
      </_Picker>
    </View>
  );
});

// @ts-ignore
Picker.Item = PickerItem;
// @ts-ignore
Picker.modes = _Picker.modes;

export default Picker as typeof Picker & {
  Item: typeof PickerItem;
  modes: typeof _Picker.modes;
};
