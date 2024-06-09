// @ts-nocheck
import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { combineOnProps } from "@/utils/components";
import { useFlatListProps } from "@/utils/lists";
import Picker, { PickerInput, PickerProps } from "@/components/common/Picker";
import LoaderView from "@/components/common/LoaderView";

type RemotePickerProps = PickerProps & {
  useOptions: any;
  useSelected?: any;
  valueParamKey?: string;
  searchParamKey?: string;
  labelExtractor?: () => string;
  valueExtractor?: () => string;
  optionsExtractor?: () => any[];
};

const defaultLabelExtractor = (item: any) => item.name;
const defaultValueExtractor = (item: any) => item.id;
const defaultOptionsExtractor = (query: any) =>
  query.data?.pages?.flatMap((page: any) => page.results) ?? [];
const RemotePicker = (props: RemotePickerProps) => {
  const {
    value,
    useOptions,
    useSelected = () => ({ data: null }),
    valueParamKey = "id",
    searchParamKey = "q",
    listProps,
    pickerModalProps,
    renderItem,
    labelExtractor = defaultLabelExtractor,
    valueExtractor = defaultValueExtractor,
    optionsExtractor = defaultOptionsExtractor,
    mode = Picker.modes.SINGLE,
    onPress,
    ...restProps
  } = props;

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const selectedQuery = useSelected({
    enabled: mode === Picker.modes.SINGLE && value != null,
    params: {
      [valueParamKey]: value,
    },
  });

  const optionsQuery = useOptions({
    enabled: visible,
    params: {
      [searchParamKey]: debouncedSearch,
    },
  });
  const options = optionsExtractor(optionsQuery);

  const [newListProps, restListProps] = useFlatListProps({
    ...listProps,
    isLoading: optionsQuery.hasNextPage ?? false,
    ListEmptyComponent: optionsQuery.isLoading ? <LoaderView /> : undefined,
    onEndReached: () =>
      optionsQuery.isEnabled &&
      optionsQuery.hasNextPage &&
      optionsQuery.fetchNextPage(),
  });

  useEffect(() => {
    if (visible) return;

    setSearch("");
  }, [visible]);

  const toggleVisible = (force?: boolean) => {
    if (typeof force === "boolean") setVisible(force);
    else setVisible((visible) => !visible);
  };

  const renderPickerItem = (item: any) => {
    const label = labelExtractor(item);
    const value = valueExtractor(item);

    return (
      <Picker.Item
        key={value}
        label={label}
        value={value}
        renderItem={renderItem}
      />
    );
  };

  const pickerValue = selectedQuery.data
    ? labelExtractor(selectedQuery.data)
    : null;

  return (
    <Picker
      renderPicker={(props) => (
        <PickerInput {...props} value={pickerValue ?? props.value} />
      )}
      {...restProps}
      value={value}
      mode={mode}
      listProps={{
        ...restListProps,
        ...newListProps,
      }}
      pickerModalProps={{
        ...pickerModalProps,
        onDismiss: combineOnProps((pickerModalProps as any)?.onDismiss, () =>
          toggleVisible(false)
        ),
      }}
      onPress={combineOnProps(onPress as any, () => toggleVisible(true))}
      onCustomSearchChange={(value) => setSearch(value)}
    >
      {options.map(renderPickerItem)}
    </Picker>
  );
};

RemotePicker.Item = Picker.Item;
RemotePicker.modes = Picker.modes;

export default RemotePicker;
