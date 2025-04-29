import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  examples: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
      explanation: { type: String, required: true },
    },
  ],
});

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;