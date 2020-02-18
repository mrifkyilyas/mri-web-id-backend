import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthSchema } from "./schemas/auth.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Auth", schema: AuthSchema }]),
    JwtModule.register({ secret: process.env.JWT_SECRET })
  ],
  exports: [AuthService],
  providers: [AuthService]
})
export class AuthModule {}
