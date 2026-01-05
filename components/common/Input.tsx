import React from 'react';

interface BaseInputProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  id?: string;
  className?: string;
}

interface TextInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
}

interface TextareaProps extends BaseInputProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  as?: 'textarea';
}

interface SelectProps extends BaseInputProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  as?: 'select';
  options: { value: string; label: string }[];
}

interface CheckboxProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  as?: 'checkbox';
  checkboxLabel?: string;
}

type InputProps = TextInputProps | TextareaProps | SelectProps | CheckboxProps;

export const Input: React.FC<InputProps> = (props) => {
  const {
    label,
    required,
    error,
    helperText,
    id,
    className = '',
    ...rest
  } = props;

  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const baseInputClasses = 'block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue text-base p-3 bg-gray-50 transition-colors';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';

  const renderInput = () => {
    if ('as' in rest && rest.as === 'textarea') {
      const { as, ...textareaProps } = rest as TextareaProps;
      return (
        <textarea
          id={inputId}
          className={`${baseInputClasses} ${errorClasses} ${className}`}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={helperText || error ? `${inputId}-description` : undefined}
          {...textareaProps}
        />
      );
    }

    if ('as' in rest && rest.as === 'select') {
      const { as, options, ...selectProps } = rest as SelectProps;
      return (
        <select
          id={inputId}
          className={`${baseInputClasses} ${errorClasses} ${className}`}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={helperText || error ? `${inputId}-description` : undefined}
          {...selectProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if ('as' in rest && rest.as === 'checkbox') {
      const { as, checkboxLabel, ...checkboxProps } = rest as CheckboxProps;
      return (
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id={inputId}
              type="checkbox"
              className={`focus:ring-pau-blue h-4 w-4 text-pau-blue border-gray-300 rounded ${errorClasses} ${className}`}
              aria-required={required}
              aria-invalid={!!error}
              aria-describedby={helperText || error ? `${inputId}-description` : undefined}
              {...checkboxProps}
            />
          </div>
          {checkboxLabel && (
            <div className="ml-3 text-sm">
              <label htmlFor={inputId} className="font-medium text-pau-blue">
                {checkboxLabel}
              </label>
            </div>
          )}
        </div>
      );
    }

    const { type = 'text', ...inputProps } = rest as TextInputProps;
    return (
      <input
        id={inputId}
        type={type}
        className={`${baseInputClasses} ${errorClasses} ${className}`}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={helperText || error ? `${inputId}-description` : undefined}
        {...inputProps}
      />
    );
  };

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}
      {renderInput()}
      {(helperText || error) && (
        <p
          id={`${inputId}-description`}
          className={`mt-2 text-xs ${error ? 'text-red-600' : 'text-gray-500'}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

