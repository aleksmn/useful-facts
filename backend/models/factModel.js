import mongoose from "mongoose"

const factSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Fact = mongoose.model('Fact', factSchema)