
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "userCredentials",  // This is the key change
      name: "UserCredentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`http://localhost:3000/api/auth/signInApi`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });

          const user = await res.json();
          console.log("Token : ",user.data.jwtToken)
          console.log("That is Response : ",user)
          if (res.ok && user?.code == 1) {
            return {
              id: user.data.id,
              name: user.data.first_name,
              email: credentials.email,
              jwtToken: user.data.jwtToken
            };
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/user/signin',
    error: '/api/auth/error'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("Token in Session : ", user.jwtToken);
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.jwtToken = user.jwtToken;
      } else {
        console.log("JWT callback called again, only token available:", token);
      }
      return token;
    },    
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        jwtToken: token.jwtToken, // ✅ now inside session.user
      };
      console.log("At Session Side : ",session.user.jwtToken)
      return session;
    }
  }
  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };