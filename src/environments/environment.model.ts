import { FirebaseAppConfig } from "angularfire2";

export interface Environment {
    environmentName: string,
    ionicEnvName: string,
    firebase: FirebaseAppConfig
  }