import {
  maskitoDateOptionsGenerator,
  type MaskitoDateParams,
} from "@maskito/kit";

export const dateParams: MaskitoDateParams = {
  mode: "dd/mm/yyyy",
  separator: ".",
};

export const dateOptions = maskitoDateOptionsGenerator(dateParams);
