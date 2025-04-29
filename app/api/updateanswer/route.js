import connectToDatabase from "@/app/lib/dbConnect";
import Answer from "@/app/model/answer";

export async function PUT(req) {
  try {
    await connectToDatabase();

    const studentId = req.cookies.get('studentId')?.value;
    const body = await req.json();
    const { questionId, answer } = body;

    // Check if all required fields are provided
    if (!studentId || !questionId || !answer) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing fields" }),
        { status: 400 }
      );
    }

    // Check if the answer already exists in the database
    const existingAnswer = await Answer.findOne({ studentId, questionId });

    if (!existingAnswer) {
      return new Response(
        JSON.stringify({ success: false, message: "Answer not found" }),
        { status: 404 }
      );
    }

    // Update the existing answer
    existingAnswer.answer = answer; // Use `answer` instead of `userAnswer`
    existingAnswer.submittedAt = new Date(); // Set the current timestamp for when the answer was updated
    await existingAnswer.save(); // Save the updated answer

    // Return a success response
    return new Response(
      JSON.stringify({ success: true, message: "Answer updated successfully!" }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating answer:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
