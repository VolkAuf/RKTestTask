import { useState } from "react";

type CustomCheckboxProps = {
  label: string;
  defaultValue: boolean;
  onChange: (value: boolean) => void;
};

function CustomCheckbox(props: CustomCheckboxProps) {
  const [checked, setChecked] = useState(props.defaultValue);

  const handleChange = () => {
    props.onChange(!checked);
    setChecked(!checked);
  };

  return (
    <label>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {props.label}
    </label>
  );
}

export default CustomCheckbox;
