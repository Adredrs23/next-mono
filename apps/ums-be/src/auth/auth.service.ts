import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private keycloakConfig = {
    clientId: process.env.NEST_KC_AUTH_SERVER_CLIENT_ID,
    clientSecret: process.env.NEST_KC_AUTH_SERVER_CLIENT_SECRET,
    tokenUrl: `${process.env.NEST_KC_AUTH_SERVER_ENDPOINT}/realms/mfe-realm/protocol/openid-connect/token`,
    logoutUrl: `${process.env.NEST_KC_AUTH_SERVER_ENDPOINT}/realms/mfe-realm/protocol/openid-connect/logout`,
  };

  async authenticate(username: string, password: string) {
    const response = await axios.post(
      this.keycloakConfig.tokenUrl,
      new URLSearchParams({
        grant_type: 'password',
        client_id: this.keycloakConfig.clientId,
        client_secret: this.keycloakConfig.clientSecret,
        username,
        password,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
    return response.data;
  }

  async refreshToken(refreshToken: string) {
    const response = await axios.post(
      this.keycloakConfig.tokenUrl,
      new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.keycloakConfig.clientId,
        client_secret: this.keycloakConfig.clientSecret,
        refresh_token: refreshToken,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
    return response.data;
  }

  async logout(refreshToken: string) {
    await axios.post(
      this.keycloakConfig.logoutUrl,
      new URLSearchParams({
        client_id: this.keycloakConfig.clientId,
        client_secret: this.keycloakConfig.clientSecret,
        refresh_token: refreshToken,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
  }
}
