import {FormFieldBase} from "./FormFieldBase";

export class TextboxFormField extends FormFieldBase<string> {
  override controlType = 'textbox';
}

export class NumberFormField extends FormFieldBase<number> {
  override controlType = 'number';
}
