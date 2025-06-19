import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiResponse({ status: 200, description: 'Connexion réussie' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Vérification du code OTP' })
  @ApiResponse({ status: 200, description: 'Code OTP vérifié avec succès' })
  @ApiResponse({ status: 401, description: 'Code OTP invalide' })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOTP(verifyOtpDto.email, verifyOtpDto.otp);
  }

  @Post('generate-otp')
  @ApiOperation({ summary: 'Génération d\'un code OTP' })
  @ApiResponse({ status: 200, description: 'Code OTP généré avec succès' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async generateOtp(@Body('email') email: string) {
    return this.authService.generateOTP(email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Réinitialisation du mot de passe' })
  @ApiResponse({ status: 200, description: 'Mot de passe réinitialisé avec succès' })
  @ApiResponse({ status: 401, description: 'Code OTP invalide' })
  async resetPassword(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(email, otp, newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  @ApiOperation({ summary: 'Obtenir le profil de l\'utilisateur connecté' })
  @ApiResponse({ status: 200, description: 'Profil récupéré avec succès' })
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }
} 