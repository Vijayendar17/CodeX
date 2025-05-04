import connectToDatabase from '@/app/lib/dbConnect';
import { NextResponse } from 'next/server';
import User from '@/app/model/user'; // ✅ match export exactly
import Answer from '@/app/model/answer'; // ensure this exists

export async function GET(request, context) {
  await connectToDatabase();

  const { id } = await context.params;  // Ensure params is awaited

  try {
    // Find the user by the custom studentId field, not the MongoDB _id
    const foundUser = await User.findOne({ studentId: id })
    .populate({
      path: 'answers',           // Populate the answers array
      populate: {
        path: 'questionId',      // Populate the questionId inside the answers
        model: 'question',       // Assuming the question model is called 'Question'
      }
    });

    if (!foundUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(foundUser, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}
