import mongoose from 'mongoose';

const uri = 'mongodb+srv://sauravraj3357:sauravraj3357@cluster0.p6zpvhb.mongodb.net/?retryWrites=true&w=majority'
const options = {

}

export const mongodbConnection = async () => {
    try {
        await mongoose.connect(uri, options);
        console.log('====================================');
        console.log('Database Connected :)');
        console.log('====================================');
    } catch (error) {
        throw error;
    }
}
