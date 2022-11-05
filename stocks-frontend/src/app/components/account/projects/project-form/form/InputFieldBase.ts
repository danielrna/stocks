export class InputFieldBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  readonly: boolean;
  order: number;
  controlType: string;
  type: string;
  options: { key: string, value: string }[];

  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    readonly?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    options?: { key: string, value: string }[];
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.readonly = !!options.readonly;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}
