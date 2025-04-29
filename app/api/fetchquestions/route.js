import Question from "@/app/model/questions"; 
import connectToDatabase from "@/app/lib/dbConnect";

export async function GET() {
   await connectToDatabase()
  try {
    
    const questions = await Question.find();  
    return new Response(JSON.stringify(questions), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return new Response("Failed to fetch questions", {
      status: 500,
    });
  }
}
