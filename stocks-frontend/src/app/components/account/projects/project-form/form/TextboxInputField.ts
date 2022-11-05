import {InputFieldBase} from "./InputFieldBase";

export class TextboxInputField extends InputFieldBase<string> {
  override controlType = 'textbox';
}

export class NumberInputField extends InputFieldBase<number> {
  override controlType = 'number';
}
