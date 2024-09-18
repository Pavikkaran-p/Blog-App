import { OAuth2Client } from "google-auth-library";
import { GoogleClientId } from "../config/appConfig";

export const GoogleAuthClient = new OAuth2Client(GoogleClientId);