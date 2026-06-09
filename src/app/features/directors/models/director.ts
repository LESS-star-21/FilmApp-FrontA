export interface Director {
  _id?: string;
  name: string;
  nationality?: string;
  birthDate?: Date;
  biography?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateDirectorRequest {
  name: string;
  nationality?: string;
  birthDate?: string;
  biography?: string;
}

export interface UpdateDirectorRequest {
  name?: string;
  nationality?: string;
  birthDate?: string;
  biography?: string;
}