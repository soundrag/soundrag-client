import type { AxiosRequestConfig } from "axios";

export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export interface UserPosition {
  id: string;
  x: number;
  y: number;
  z: number;
}
