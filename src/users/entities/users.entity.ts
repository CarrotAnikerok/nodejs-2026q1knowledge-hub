import { UserRole } from 'src/constants/enums';

export class User {
  id: string; // uuid v4
  login: string;
  password: string;
  role: UserRole;
  createdAt: number;
  updatedAt: number;
}
