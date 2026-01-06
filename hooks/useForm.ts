import { useState, useCallback } from 'react';

/**
 * Generic form state management hook
 * 폼 상태 관리를 위한 재사용 가능한 훅
 * 
 * @template T - Form data type
 * @param initialValues - Initial form values
 * @returns Form state and handlers
 */
export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);

  /**
   * Handle input change for text, select, and textarea
   */
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  /**
   * Update form field directly
   */
  const setFieldValue = useCallback(<K extends keyof T>(name: K, value: T[K]) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  /**
   * Update multiple fields at once
   */
  const setFields = useCallback((values: Partial<T>) => {
    setFormData(prev => ({
      ...prev,
      ...values
    }));
  }, []);

  /**
   * Reset form to initial values
   */
  const reset = useCallback(() => {
    setFormData(initialValues);
  }, [initialValues]);

  /**
   * Reset form to custom values
   */
  const resetTo = useCallback((values: T) => {
    setFormData(values);
  }, []);

  return {
    formData,
    handleChange,
    setFieldValue,
    setFields,
    reset,
    resetTo,
    setFormData // For advanced use cases
  };
};




