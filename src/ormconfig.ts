import { DataSourceOptions } from "typeorm";
import { User } from "./module/user/user.entity";
import { EmailVerification } from "./module/user/email-verification.entity";
import { PasswordReset } from "./module/user/password-reset.entity";
import { UserSession} from "./module/user/session.entity";

export const typeOrmConfig: DataSourceOptions = {
    type: 'postgres', // data base
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'auth-service',
    entities: [User, EmailVerification, PasswordReset, UserSession],
    synchronize: true, // only for development
    logging: false,
}