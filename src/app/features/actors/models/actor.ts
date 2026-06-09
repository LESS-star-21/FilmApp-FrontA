export interface Actor {
  _id?: string;
  name: string;
  nationality?: string;
  birthDate?: Date;
  biography?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateActorRequest {
  name: string;
  nationality?: string;
  birthDate?: string;
  biography?: string;
}

export interface UpdateActorRequest {
  name?: string;
  nationality?: string;
  birthDate?: string;
  biography?: string;
}
