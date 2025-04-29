import connectToDatabase from "@/app/lib/dbConnect";
import User from "@/app/model/user";
import Answer from "@/app/model/answer";

export async function POST(req) {
  try {
    await connectToDatabase();

    // 1. Get studentId from cookies
    const studentId = req.cookies.get('studentId')?.value;
    console.log('[DEBUG] Student ID:', studentId);

    // 2. Parse request body
    const body = await req.json();
    const { questionId, answer: userAnswer } = body;

    // 3. Validate required fields
    if (!studentId || studentId.length !== 10) { 
      return Response.json(
        { success: false, message: "Invalid student ID" },
        { status: 401 }
      );
    }

    // 4. Create and save answer (using String studentId)
    const newAnswer = new Answer({
      questionId,
      answer: userAnswer,
      studentId, // As string (matches User schema)
      submittedAt: new Date()
    });
    await newAnswer.save();

    // 5. Update user's answers
    await User.findOneAndUpdate(
      { studentId }, // Query by string studentId
      { $push: { answers: newAnswer._id } },
      { new: true }
    );

    return Response.json(
      { success: true, message: "Answer submitted!" },
      { status: 201 }
    );

  } catch (error) {
    console.error('[ERROR]', error);
    return Response.json(
      { success: false, message: error.message || "Submission failed" },
      { status: 500 }
    );
  }
}