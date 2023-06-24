export interface RegisterBodyRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginBodyRequest {
  email: string;
  password: string;
}

interface ReturnDataUser {
  name: string | null;
  email: string | null;
}

export interface AuthResponseBody {
  status: number;
  message: string;
  data: ReturnDataUser | null;
}
