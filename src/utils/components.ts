import { ReactNodeOrComponent } from "@/utils/types";

// Function to call an array of functions that are supposed to go on onX props
export const combineOnProps = <F extends (...args: any) => any>(
  ...onProps: F[]
) => {
  return async (...args: Parameters<F>) => {
    for (const onProp of onProps) {
      await onProp?.(...args);
    }
  };
};

export const renderComponentOrElement = <P = unknown>(
  componentOrElement: ReactNodeOrComponent<P>,
  props?: P
) => {
  if (!componentOrElement) return null;

  if (typeof componentOrElement === "function") {
    if (!props)
      throw new Error("Trying to render component but props were omitted");

    return componentOrElement(props);
  }

  return componentOrElement;
};
