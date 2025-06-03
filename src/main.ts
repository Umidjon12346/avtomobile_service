import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as basicAuth from "express-basic-auth";

async function bootstrap() {
  const PORT = process.env.PORT || 3030;
  const app = await NestFactory.create(AppModule);

  // CORS ni yoqish (cookie yuborish uchun credentials: true ham kerak bo'lishi mumkin)
  app.enableCors({
    origin: true, // yoki ['http://localhost:3000'] kabi domenlar ro'yxati
    credentials: true, // cookie yuborish uchun kerak
  });

  app.use(cookieParser());

  // Swagger uchun Basic Auth
  app.use(
    ["/api/docs"],
    basicAuth({
      users: { Admin: "123" },
      challenge: true,
    })
  );

  app.setGlobalPrefix("api");

  // Swagger konfiguratsiyasi
  const config = new DocumentBuilder()
    .setTitle("Avtomobile Service project")
    .setDescription("Avtomobile Service REST API")
    .setVersion("1.0")
    .addTag("Nestjs", "Validation")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT token",
      },
      "JWT-auth"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();
