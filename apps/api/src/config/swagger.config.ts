import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Agape Care API')
    .setDescription('Agape Care ERP System API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', '인증 API')
    .addTag('employee', '직원 관리')
    .addTag('resident', '입소자 관리')
    .addTag('care', '케어 관리')
    .addTag('meal', '식단 관리')
    .addTag('program', '프로그램 관리')
    .addTag('content', '콘텐츠 관리')
    .addTag('operations', '운영 관리')
    .addTag('accounting', '회계 관리')
    .addTag('attendance', '출결 관리')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}
