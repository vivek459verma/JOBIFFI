import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/jobifii";

const fixIndexes = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB.");

        const collection = mongoose.connection.collection('employers');

        // List indexes to confirm
        const indexes = await collection.indexes();
        console.log("Current Indexes:", indexes.map(i => i.name));

        // Attempt to drop the specific problematic index
        const indexName = "identity.email_1";
        if (indexes.find(i => i.name === indexName)) {
            await collection.dropIndex(indexName);
            console.log(`✅ Dropped index: ${indexName}`);
        } else {
            console.log(`ℹ️ Index ${indexName} not found. checking for other potential conflicts...`);
        }

        // Also try dropping unique email index if it exists and conflicts with nulls (though the error was specific to identity.email)
        // const emailIndex = "email_1";
        // if (indexes.find(i => i.name === emailIndex)) {
        //    console.log("Found email_1 index. Keeping it as it matches current schema.");
        // }

    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
};

fixIndexes();
