export interface User {
  _id: string;
  email: string;
  password: string;
  isActive: boolean;
  roles: string[];
}
