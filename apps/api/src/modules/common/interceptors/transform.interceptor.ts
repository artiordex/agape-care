import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  statusCode: number;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const serializedData = this.serializeBigInt(data);

        // ts-rest responses have a { status, body } structure.
        // ApiResponseSchema responses have a { success, data } structure.
        // If we detect these, we return it as-is to prevent double-wrapping.
        if (
          serializedData &&
          typeof serializedData === 'object' &&
          ((typeof serializedData.status === 'number' && 'body' in serializedData) ||
            (serializedData.success === true && 'data' in serializedData))
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
