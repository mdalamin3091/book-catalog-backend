import { User } from "@prisma/client";

export type IFilterOptions = {
  searchTerm?: string;
  name?: string;
  email?: string;
  contactNo?: string;
  address?: string;
};

export type UserWithoutPassword = Omit<User, "password">;
