import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }: any) {
      try {
        await connectMongoDB();

        // Memeriksa jika user telah ada
        const UserExist = await User.findOne({
          email: profile.email,
        });
        // Jika tidak ada, buat user baru
        if (!UserExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
