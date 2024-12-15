import * as Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: "localhost",
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
  port: 9000,
  useSSL: false,
});

export { minioClient };
