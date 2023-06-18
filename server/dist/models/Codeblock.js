import mongoose from 'mongoose';
var CodeblockSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 20,
    },
    code: {
        type: String,
    },
    solution: {
        type: String,
    },
}, { timestamps: true });
export default mongoose.model('Codeblock', CodeblockSchema);
//# sourceMappingURL=Codeblock.js.map