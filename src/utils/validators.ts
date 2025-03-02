export const required = (message: string) => (value: string) =>
  value.trim() ? undefined : message;

export const validEmail = (message: string) => (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? message : true;
