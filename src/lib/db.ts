import { MongoClient, ServerApiVersion } from "mongodb";
import { DATABASE_NAME, MONGO_URI } from "./env";

const mongoClientSingleton = () => {
    const client = new MongoClient(MONGO_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    return client.db(DATABASE_NAME);
};

declare const globalThis: {
    mongoGlobal: ReturnType<typeof mongoClientSingleton>;
} & typeof global;

const mongo = globalThis.mongoGlobal ?? mongoClientSingleton();

export default mongo;

if (process.env.NODE_ENV !== "production") globalThis.mongoGlobal = mongo;
