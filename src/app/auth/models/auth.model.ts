export interface LoggedUser {
  name: string;
  avatar: string;
  session: any;
}

export interface LoginDetails {
  userName: string;
  password: string;
}

export interface RegisterDetails {
  userName: string;
  email: string;
  password: string;
}

export interface VerificationDetails {
  userName: string;
  verificationCode: string;
}

export interface ResetPasswordDetails {
  userName: string;
  verificationCode: string;
  password: string;
}


