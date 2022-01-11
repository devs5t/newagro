import React from "react";

interface TextfieldProps {
  id: string;
  label?: string;
  onChange: Function,
  value: any,
  type?: 'text' | 'number' | 'password' | 'email' | 'date';
  required?: boolean;
  containerClasses?: string;
  inputClasses?: string;
  disabled?: boolean;
  placeholder?: string;
}

const Textfield: React.FC<TextfieldProps> = ({
  id,
  label ,
  onChange,
  value,
  type= 'text',
  required= false,
  containerClasses = '',
  inputClasses= '',
  disabled= false,
  placeholder = '',
}) => {

  return (
    <div className={`w-full ${containerClasses}`}>
      {label && (
        <label
          className="block tracking-wide text-blue text-sm font-medium mb-2"
          htmlFor={id}
        >
          {label}{required ? '*' : ''}
        </label>
      )}
      <input
        className={`appearance-none block w-full border border-blue text-blue rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${inputClasses}`}
        id={id}
        type={type}
        required={required}
        onChange={e => onChange(e.target.value)}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Textfield;