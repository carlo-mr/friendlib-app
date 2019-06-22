import {AvataaarsConfig} from '../../avataaars/components/avataaars-wrapper/avataaars-wrapper.component';

export interface LoggedUser {
  name: string;
  avatar: AvataaarsConfig;
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

export interface NewPasswordDetails {
  userName: string;
  verificationCode: string;
  password: string;
}


