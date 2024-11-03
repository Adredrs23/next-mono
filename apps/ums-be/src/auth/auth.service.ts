import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private keycloakConfig = {
    clientId: process.env.NEST_KC_AUTH_SERVER_CLIENT_ID,
    clientSecret: process.env.NEST_KC_AUTH_SERVER_CLIENT_SECRET,
    tokenUrl: `${process.env.NEST_KC_AUTH_SERVER_ENDPOINT}/realms/mfe-realm/protocol/openid-connect/token`,
    logoutUrl: `${process.env.NEST_KC_AUTH_SERVER_ENDPOINT}/realms/mfe-realm/protocol/openid-connect/logout`,
    userInfoUrl: `${process.env.NEST_KC_AUTH_SERVER_ENDPOINT}/realms/mfe-realm/protocol/openid-connect/userinfo`,
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
        scope: 'openid email profile', //remember to request openid as a scope explcitily to access the user profile
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

  async getUserProfile(accessToken: string) {
    try {
      const response = await axios.get(this.keycloakConfig.userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to load user profile');
    }
  }
}
