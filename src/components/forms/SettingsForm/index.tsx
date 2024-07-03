import { SegmentedControl } from "react-native-ui-lib";
import { UseFormReturn, Controller, FieldValues } from "react-hook-form";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getPointTypeQueryOptions,
  getPointTypesListQueryOptions,
} from "@/services/react-query/resources/point-types";
import CustomField from "@/components/common/CustomField";
import RemotePicker from "@/components/common/RemotePicker";
import CustomRating from "@/components/common/CustomRating";

type PointFormProps<T extends FieldValues = any> = {
  form: UseFormReturn<T>;
};

const usePointTypes = ({ enabled, params }: any) =>
  useInfiniteQuery({
    ...getPointTypesListQueryOptions(params),
    enabled,
  });

const usePointType = ({ enabled, params }: any) => {
  const { id } = params;

  return useQuery({ ...getPointTypeQueryOptions(id), enabled });
};

const SettingsForm = (props: PointFormProps) => {
  const { form } = props;

  return (
    <>
      <Controller
        name="theme"
        control={form.control}
        render={({ field: { value, onChange } }) => (
          <CustomField label="Temă">
            <SegmentedControl
              initialIndex={value == null ? 0 : value - 1}
              segments={[
                { label: "Auto" },
                { label: "Luminos" },
                { label: "Întunecat" },
              ]}
              onChangeIndex={(index) => onChange(index + 1)}
            />
          </CustomField>
        )}
      />

      <Controller
        name="find_closest_point"
        control={form.control}
        render={({ field: { value, onChange } }) => (
          <CustomField
            label="Găsește punct la pornire"
            showClear={!!value}
            onClear={() => onChange(null)}
          >
            <RemotePicker
              preset="default"
              value={value}
              useOptions={usePointTypes}
              useSelected={usePointType}
              placeholder="Alege"
              showSearch
              onChange={onChange}
            />
          </CustomField>
        )}
      />

      <Controller
        name="minimum_rating"
        control={form.control}
        render={({ field: { value, onChange } }) => (
          <CustomField
            label="Notă minimă"
            showClear={!!value}
            onClear={() => onChange(null)}
          >
            <CustomRating
              showRating={false}
              defaultValue={value}
              onFinishRating={(rating: number) => onChange(rating)}
            />
          </CustomField>
        )}
      />
    </>
  );
};

export default SettingsForm;
