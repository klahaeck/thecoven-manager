import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import EmailProvider from "next-auth/providers/email";
// import sendVerificationRequest from '../../../lib/sendVerificationRequest';
import _nodemailer from "nodemailer";
import { google } from "googleapis";
import '../../../styles/globals.scss';

const OAuth2 = google.auth.OAuth2;
const myOAuth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
myOAuth2Client.setCredentials({refresh_token:process.env.GOOGLE_REFRESH_TOKEN});

export default NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: {
          server,
          from
        }
      }) {
        const {
          host
        } = new URL(url);
        // const transport = (0, _nodemailer.createTransport)(server);
        const myAccessToken = myOAuth2Client.getAccessToken();
        const transport = _nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "admin@thecoven.com", //your gmail account you used to set the project up in google cloud console"
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            accessToken: myAccessToken //access token variable we defined earlier
        }});
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to manage your plan`,
          text: text({
            url,
            host
          }),
          html: html({
            url,
            host,
            email
          })
        });
      },
    }),
  ],
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  // secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    // strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: 60 * 60, // 1 hour

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log(user, account, profile, email, credentials);
    //   // if (!email.verificationRequest) {
    //   //   const customers = await stripe.customers.list({
    //   //     email: 
    //   //     limit: 1,
    //   //   });

    //   //   console.log('signed in:', email);
    //   //   // Return false to display a default error message
    //   //   return true;
    //   //   // Or you can return a URL to redirect to:
    //   //   // return '/unauthorized';
    //   // } else {
    //   //   return true;
    //   // }
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   console.log('redirect:', url, baseUrl);
    //   if (url.startsWith(baseUrl)) return url;
    //   // Allows relative callback URLs
    //   else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
    //   return baseUrl;
    // }
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#d9257d", // Hex color code
    logo: "https://images.squarespace-cdn.com/content/v1/5f1b16f93cbf1c1bb81a35ea/1596747152694-QHVKGBFOGJR4A7NFSI1W/FB_COVER_815x325P_%252Bbw_trans.png%3Fformat=1500w" // Absolute URL to image
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  debug: false
});

function html({
  url,
  host,
  email
}) {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;
  // const backgroundColor = "#f9f9f9";
  // const textColor = "#444444";
  // const mainBackgroundColor = "#ffffff";
  // const buttonBackgroundColor = "#346df1";
  // const buttonBorderColor = "#346df1";
  // const buttonTextColor = "#ffffff";

  const backgroundColor = "#ffffff";
  const textColor = "#000000";
  const mainBackgroundColor = "#ffffff";
  const buttonBackgroundColor = "#d9257d";
  const buttonBorderColor = "#d9257d";
  const buttonTextColor = "#ffffff";
  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: ${backgroundColor};" bgcolor="${backgroundColor}">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <img src="https://images.squarespace-cdn.com/content/v1/5f1b16f93cbf1c1bb81a35ea/1596747152694-QHVKGBFOGJR4A7NFSI1W/FB_COVER_815x325P_%252Bbw_trans.png%3Fformat=1500w" alt="The Coven logo" width="75%" />
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;" bgcolor="${backgroundColor}">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <p>Click the button below to sign in and manage your plan at The Coven.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

function text({
  url,
  host
}) {
  return `Sign in to\n\n${url}\n\by pasting the link above into your browser.`;
}