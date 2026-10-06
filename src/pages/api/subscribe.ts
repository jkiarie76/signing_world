import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

const MAILERLITE_API_URL =
  "https://connect.mailerlite.com/api/subscribers";

const COMMUNITY_GROUP_ID = "200488526612005933";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please enter a valid email address.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const apiKey = env.MAILERLITE_API_KEY;

    if (!apiKey) {
      console.error("MAILERLITE_API_KEY is missing.");

      return new Response(
        JSON.stringify({
          success: false,
          message: "Newsletter service is not configured.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const response = await fetch(MAILERLITE_API_URL, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        email,
        groups: [COMMUNITY_GROUP_ID],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "MailerLite error:",
        response.status,
        data
      );

      return new Response(
        JSON.stringify({
          success: false,
          message:
            data?.message ||
            "We couldn't complete your signup. Please try again.",
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "You have successfully joined our community!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Subscribe endpoint error:",
      error
    );

    return new Response(
      JSON.stringify({
        success: false,
        message:
          "Something went wrong. Please try again.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};