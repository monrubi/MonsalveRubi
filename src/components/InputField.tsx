interface InputFieldProps {
  id: string;
  name: string;
  formProperty: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  rows?: number;
}

export function TextInputField({
  id,
  name,
  formProperty,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{name}</label>
      <input
        id={id}
        name={formProperty}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export function TextAreaInputField({
  id,
  name,
  formProperty,
  value,
  onChange,
  required = false,
  rows = 6,
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{name}</label>
      <textarea
        id={id}
        name={formProperty}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}