import connectToDatabase from '@/app/lib/dbConnect'; 
import { NextResponse } from 'next/server';
import Question from '@/app/model/questions';  

export async function GET(request, { params }) {
  await connectToDatabase(); 
  const { id } = await params;  

  try {
    const question = await Question.findById(id);
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }
    return NextResponse.json(question);
  } catch (error) {
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}
