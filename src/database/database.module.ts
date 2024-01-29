import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const uri =
                    config.get('MONGO_URI') || 'mongodb://127.0.0.1:27017';
                console.log(`Conneted to DB: ${uri}`);
                return {
                    uri,
                    connectTimeoutMS: 5000,
                    dbName: 'nestjs'
                };
            }
        })
    ]
})
export class DatabaseModule {}
