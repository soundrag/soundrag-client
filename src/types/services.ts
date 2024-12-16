import type { AxiosRequestConfig } from "axios";
import { UserData } from "./common";

export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export interface InquirePosition {
  user: UserData[];
}

export interface SavePosition {
  message: string;
  position: UserData;
}

export interface DeletePosition {
  message: string;
}
