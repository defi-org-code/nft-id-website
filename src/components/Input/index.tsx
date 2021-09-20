interface IProps {
  placeholder: string;
  onChange: (val: string) => void;
  value: string;
  className?: string;
  disabled?: boolean;
}

function Input({ placeholder, onChange, value, className, disabled }: IProps) {
  return (
    <input
      disabled={disabled}
      className={className ? `${className} input` : "input"}
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      value={value}
    />
  );
}

export default Input;
