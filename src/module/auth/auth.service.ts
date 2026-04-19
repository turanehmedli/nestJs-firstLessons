import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwt: JwtService,
  ) {}

  //*token generate access and refresh
  async generateToken(user: any) {
    const payload: any = { id: String(user._id), role: user.role };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET as string, // type mueyyen degilse hemin typi istifade etmesine komek edir
      expiresIn: 15 * 60 * 1000,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET as string, // type mueyyen degilse hemin typi istifade etmesine komek edir
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken, refreshToken };
  }

  //*update Refresh Token

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.UserService.update(userId, { refreshToken: hashed });
  }

  //* register
  async register(dto: RegisterDto) {
    dto.password = await bcrypt.hash(dto.password, 10);

    const user = await this.UserService.create({
      ...dto,
      role: Role.USER,
    });

    const tokens = await this.generateToken(user);

    await this.updateRefreshToken(String(user._id), tokens.refreshToken);

    return tokens;
  }

  //* login
  async login(dto: LoginDto) {
    const user = await this.UserService.findByEmailRaw(dto.email);
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateToken(user);
    await this.updateRefreshToken(String(user._id), tokens.refreshToken);

    return tokens;
  }

  //*refresh
  async refresh(user: any) {
    const { id, refreshToken: incomingToken } = user;

    const dbUser = await this.UserService.findById(id);

    if (!dbUser || !dbUser.refreshToken) {
      throw new UnauthorizedException('Refresh Token not found');
    }

    const tokenMatches = await bcrypt.compare(
      incomingToken,
      dbUser.refreshToken,
    );

    if (!tokenMatches) {
      throw new UnauthorizedException('Refresh Token is Invalid');
    }

    const tokens = await this.generateToken(dbUser);
    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }
}
