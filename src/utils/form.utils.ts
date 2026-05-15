import type { UseFormSetError, FieldValues, Path } from 'react-hook-form';
import type { ApiResponse } from '../types/api';

export const handleServerErrors = <T extends FieldValues>(
  errorData: ApiResponse<unknown> | undefined,
  setError: UseFormSetError<T>
) => {
  if (errorData?.errors && Array.isArray(errorData.errors)) {
    errorData.errors.forEach((err) => {
      if (err.field) {
        setError(err.field as Path<T>, {
          type: 'server',
          message: err.message,
        });
      }
    });
  }
};
