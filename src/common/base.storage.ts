export interface Storage<T extends { id: string }> {
  findAll(): Promise<T[]>;
  findById(id: T['id']): Promise<T | undefined>;
  create(dto: Partial<T>): Promise<T>;
  update(id: T['id'], dto: Partial<T>): Promise<T | undefined>;
  delete(id: T['id']): Promise<void>;
}
