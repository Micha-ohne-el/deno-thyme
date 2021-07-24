import {Thyme} from './mod.ts';

export type SimpleFormat = SimpleFormatDescriptor[];
export interface SimpleFormatDescriptor {
  key: string;
  value: (thyme: Thyme, length?: number) => string;
  left?: boolean;
  padding?: string;
}
