import mongoose from 'mongoose';

const CodeblockSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model('Codeblock', CodeblockSchema);
