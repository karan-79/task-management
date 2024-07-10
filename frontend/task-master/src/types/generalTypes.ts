export type Nullable<T> = T | null;

export type TransformPartial<T> = (state: T) => Partial<T>;

export type UUID = string;
