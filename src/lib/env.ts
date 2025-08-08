function getEnvVar(name: string) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required enviroment variable: ${name}`);
    }
    return value;
}

export const MONGO_URI = getEnvVar("MONGODB");
export const DATABASE_NAME = getEnvVar("DATABASE_NAME");
