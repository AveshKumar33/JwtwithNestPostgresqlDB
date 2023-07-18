import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { dirname, join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      playground:true,
      autoSchemaFile: join(process.cwd(),'src/user/schema.graphql'),
      definitions:{
        path:join(process.cwd(),'src/user/graphql.ts'),
      }

    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'user_db',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
