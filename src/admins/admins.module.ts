import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema }
    ])
  ],
  providers: [AdminsService],
  controllers: [AdminsController],
  exports: [AdminsService]
})
export class AdminsModule {}
