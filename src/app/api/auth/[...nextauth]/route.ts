// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import { connectToDatabase } from "../../../../lib/mongodb";
// import User from "../../../../models/user"; // Adjust the import to the correct path

// interface Credentials {
//   email: string;
//   password: string;
// }

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials: Record<string, string> | undefined) {
//         // Ensure credentials is defined and has required properties
//         if (!credentials || !credentials.email || !credentials.password) {
//           throw new Error("Missing email or password");
//         }

//         // Connect to the database
//         const db = await connectToDatabase();

//         // Find the user by email
//         const user = await db.collection("users").findOne({ email: credentials.email });

//         // Verify password and return user if valid
//         if (user && await bcrypt.compare(credentials.password, user.password)) {
//           return {
//             id: user._id.toString(),
//             name: user.name,
//             email: user.email,
//           };
//         } else {
//           throw new Error("Invalid email or password");
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//   },
//   callbacks: {
//     async session({ session, user }: { session: any; user: any }) {
//       // Add user id to the session object
//       if (user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../../utils/mongodb";
// import User from "../../../../models/user";
import User from "../../../../models/User"; // Adjust the import to the correct path

// Define the credentials type
interface Credentials {
  email: string;
  password: string;
}

// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      // Define the fields that will be used in the login form
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        // Ensure credentials is defined and has required properties
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        const db = await connectToDatabase();

        // Find the user by email
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        // Verify password and return user if valid
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          } as User;
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      // Add user id to the session object
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
