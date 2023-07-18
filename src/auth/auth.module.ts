import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { JwtGuard } from './jwt.guards';

@Module({
    imports:[UserModule],
    exports:[],
    providers:[AuthGuard,JwtGuard]

})
export class AuthModule {}
