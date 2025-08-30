export type OperationType = 'merge' | 'crop';
export type ShapeType = 'circle' | 'square' | 'triangle';

export interface ImageState {
  preview1: string | null;
  preview2: string | null;
}