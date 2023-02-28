import mongoose from "mongoose";
import { Schema } from "mongoose";

const JobSchema = new Schema({
    title: String,
    company: String,
    description: [String],
    location: String,
    workType: String,
    workLevel: String,
    salary: String,
    logoUrl: String,
},
    { timestamps: true }
);

export const Job = mongoose.model('Job', JobSchema);