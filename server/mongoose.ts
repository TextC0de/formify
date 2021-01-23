import mongoose from 'mongoose';
import winston from 'winston';

mongoose
    .connect(
        `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error(error);
        winston.error(error);
    });

mongoose.connection.on('open', () => winston.info('MongoDB connected'));
