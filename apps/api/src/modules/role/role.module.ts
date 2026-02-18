/**
 * Description : role.module.ts - ?? role ?? ??? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
