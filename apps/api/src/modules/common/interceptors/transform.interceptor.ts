/**
 * Description : transform.interceptor.ts - ?? transform.interceptor ?? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  statusCode: number;
  timestamp: string;
}

// @TsRestHandler 데코레이터가 적용된 메서드에는 INTERCEPTORS_METADATA에 TsRestHandlerInterceptor가 포함됨
// 이를 감지해서 TransformInterceptor가 ts-rest 응답을 이중 래핑하지 않도록 처리
const TS_REST_HANDLER_INTERCEPTOR_NAME = 'TsRestHandlerInterceptor';
const INTERCEPTORS_METADATA = '__interceptors__';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // @TsRestHandler 라우트인지 확인: 해당 핸들러에 TsRestHandlerInterceptor가 등록되어 있음
    const handler = context.getHandler();
    const interceptors: any[] = Reflect.getMetadata(INTERCEPTORS_METADATA, handler) || [];
    const isTsRestRoute = interceptors.some(
      (i: any) =>
        (typeof i === 'function' && i.name === TS_REST_HANDLER_INTERCEPTOR_NAME) ||
        (typeof i === 'object' && i?.constructor?.name === TS_REST_HANDLER_INTERCEPTOR_NAME),
    );

    return next.handle().pipe(
      map(data => {
        // ts-rest 라우트는 TsRestHandlerInterceptor가 이미 res.status()를 설정하고
        // body만 반환하므로 TransformInterceptor가 추가 래핑하지 않음
        if (isTsRestRoute) {
          return data;
        }

        const serializedData = this.serializeBigInt(data);

        // ApiResponseSchema responses have a { success, data } structure.
        // If we detect these, we return it as-is to prevent double-wrapping.
        if (
          serializedData &&
          typeof serializedData === 'object' &&
          serializedData.success === true &&
          'data' in serializedData
        ) {
          return serializedData;
        }

        return {
          data: serializedData,
          statusCode: context.switchToHttp().getResponse().statusCode,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }

  private serializeBigInt(data: any): any {
    if (data === null || data === undefined) return data;

    if (typeof data === 'bigint') {
      return data.toString();
    }

    if (Array.isArray(data)) {
      return data.map(item => this.serializeBigInt(item));
    }

    // Only recurse on plain objects to avoid breaking Date, Buffer, etc.
    // and to prevent stack overflows on circular structures (though plain objects can still be circular)
    if (typeof data === 'object' && Object.prototype.toString.call(data) === '[object Object]') {
      const result: any = {};
      for (const key of Object.keys(data)) {
        result[key] = this.serializeBigInt(data[key]);
      }
      return result;
    }

    return data;
  }
}
