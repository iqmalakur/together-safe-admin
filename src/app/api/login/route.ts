import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userErrors: string[] = [];

  if (!body.username) {
    userErrors.push("Username harus diisi");
  }

  if (!body.password) {
    userErrors.push("Password harus diisi");
  }

  if (userErrors.length > 0) {
    return NextResponse.json({ errors: userErrors }, { status: 400 });
  }

  if (body.username !== "admin" || body.password !== "admin1234") {
    return NextResponse.json(
      { errors: ["Username atau password salah"] },
      { status: 401 },
    );
  }

  const token = sign({ username: body.username }, "secret", {
    expiresIn: "7d",
  });

  const response = NextResponse.json(
    { message: "Login berhasil" },
    { status: 200 },
  );

  (await cookies()).set("authToken", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
