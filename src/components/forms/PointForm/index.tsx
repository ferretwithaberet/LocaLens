import { TextField } from "react-native-ui-lib";
import { UseFormReturn, Controller, FieldValues } from "react-hook-form";

import RemotePicker from "@/components/common/RemotePicker";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getPointTypeQueryOptions,
  getPointTypesListQueryOptions,
} from "@/services/react-query/resources/point-types";
import { getFieldErrorMessage } from "@/utils/forms";

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

const PointForm = (props: PointFormProps) => {
  const { form } = props;

  return (
    <>
      <Controller
        name="name"
        control={form.control}
        rules={{
          required: "Acest câmp este necesar",
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            preset="default"
            value={value}
            placeholder="Nume"
            floatingPlaceholder
            retainValidationSpace={false}
            validationMessage={getFieldErrorMessage(form, "name")}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        name="type"
        control={form.control}
        rules={{
          required: "Acest câmp este necesar",
        }}
        render={({ field: { value, onChange } }) => (
          <RemotePicker
            preset="default"
            value={value}
            useOptions={usePointTypes}
            useSelected={usePointType}
            placeholder="Tipul punctului"
            floatingPlaceholder
            showSearch
            onChange={onChange}
          />
        )}
      />
    </>
  );
};

export default PointForm;
