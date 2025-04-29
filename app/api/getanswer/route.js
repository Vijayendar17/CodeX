import connectToDatabase from "@/app/lib/dbConnect";
import Answer from "@/app/model/answer";

export async function GET(req) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const studentId = req.cookies.get('studentId')?.value;
    const questionId = url.searchParams.get('questionId');

    if (!studentId || !questionId) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing studentId or questionId" }),
        { status: 400 }
      );
    }

    // Find the answer
    const existingAnswer = await Answer.findOne({
      studentId,
      questionId,
    });

    if (!existingAnswer) {
      return new Response(
        JSON.stringify({ success: false, message: "No answer found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, answer: existingAnswer }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching answer:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
