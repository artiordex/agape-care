/**
 * Description : jwt-refresh.guard.ts - ?? ??/?? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

// guards/jwt-refresh.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}
