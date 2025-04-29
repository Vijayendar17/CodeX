import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  studentId: {  
    type: String,  
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Answer || mongoose.model("Answer", AnswerSchema);