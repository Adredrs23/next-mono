import {
  Controller,
  Post,
  Req,
  Res,
  Body,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  getHello(): string {
    return 'this.appService.getHello();';
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const tokens = await this.authService.authenticate(
        body.username,
        body.password,
      );
      res.cookie('accessToken', tokens.access_token, {
        httpOnly: true,
        secure: true, // Use true in production (HTTPS)
        sameSite: 'strict',
      });
      res.cookie('refreshToken', tokens.refresh_token, {
        httpOnly: true,
        secure: true, // Use true in production (HTTPS)
        sameSite: 'strict',
      });
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Logged in successfully' });
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Login failed', error });
    }
  }

  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'No refresh token provided' });
      }

      const newTokens = await this.authService.refreshToken(refreshToken);
      res.cookie('accessToken', newTokens.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Token refreshed successfully' });
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Token refresh failed', error });
    }
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'No refresh token provided' });
      }

      // Call Keycloak's logout endpoint
      await this.authService.logout(refreshToken);

      // Clear cookies after logging out
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Logged out successfully' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Logout failed', error });
    }
  }
}
