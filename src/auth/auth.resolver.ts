import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { Auth } from './entities/auth.entity';
import { Token } from './entities/token.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('data') { email, password }: SignupInput) {
    const { accessToken, refreshToken } = await this.authService.createUser({
      email: email.toLowerCase(),
      password,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  // login
  @Mutation(() => Auth)
  async login(@Args('data') { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.authService.login({
      email: email.toLowerCase(),
      password,
    });

    return { accessToken, refreshToken };
  }

  // refresh token
  @Mutation(() => Token)
  async refreshToken(@Args('token') token: string) {
    const { accessToken, refreshToken } = this.authService.refreshToken(token);
    return { accessToken, refreshToken };
  }

  // @UseGuards(GqlAuthGuard)
  // @Query(() => User)
  // async user(@CurrentUser('currentUser') currentUser: ICurrentUser) {
  //   const user = await this.authService.getUserFromToken(currentUser.id);
  //   return user;
  // }
}
