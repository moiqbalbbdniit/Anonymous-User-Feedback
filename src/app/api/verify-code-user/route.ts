// src/app/api/verify-code-user/route.ts

export async function POST() {
  return new Response("This route is disabled", { status: 410 });
}

// import dbConnect from '@/lib/dbConnect';
// import UserModel from '@/model/User';

// export async function POST(request: Request) {
//   // Connect to the database
//   await dbConnect();

//   try {
//     const { username, code } = await request.json();
//     console.log('username:', username);
//     console.log('code:', code);
//     const decodedUsername = decodeURIComponent(username);
//     const user = await UserModel.findOne({ username: decodedUsername });

//     if (!user) {
//       return Response.json(
//         { success: false, message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     // Check if the code is correct and not expired
//     const isCodeValid = user.verifyCode === code;
//     const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

//     if (isCodeValid && isCodeNotExpired) {
//       // Update the user's verification status
//       user.isVerified = true;
//       await user.save();

//       return Response.json(
//         { success: true, message: 'Account verified successfully' },
//         { status: 200 }
//       );
//     } else if (!isCodeNotExpired) {
//       // Code has expired
//       return Response.json(
//         {
//           success: false,
//           message:
//             'Verification code has expired. Please sign up again to get a new code.',
//         },
//         { status: 400 }
//       );
//     } else {
//       // Code is incorrect
//       return Response.json(
//         { success: false, message: 'Incorrect verification code' },
//         { status: 400 }
//       );
//     }
//   } catch (error) {
//     console.error('Error verifying user:', error);
//     return Response.json(
//       { success: false, message: 'Error verifying user' },
//       { status: 500 }
//     );
//   }
// }
