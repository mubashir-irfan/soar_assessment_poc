import React, { useEffect, useRef } from 'react';
import { FieldError, Merge, FieldErrorsImpl, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'date';
  placeholder?: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  readOnly?: boolean;
  defaultValue?: string | number | undefined;
}

function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  id,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  readOnly,
  defaultValue
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-base md:text-lg font-medium text-text-primary mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 rounded-[15px] border border-border-light bg-white text-text-secondary placeholder:text-text-tertiary focus:outline-none focus:border-soar ${readOnly ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''
          }`}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        readOnly={readOnly}
        defaultValue={defaultValue}
      />
      {error && typeof error === 'string' && (
        <p className="text-sm text-text-error mt-1" id={ariaDescribedBy}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput;