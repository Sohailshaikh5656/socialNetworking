import { encrypt, decrypt } from "@/app/assets/encription";
export async function POST(request) {
  try {
    console.log("Entered the Api : ")
    const body = await request.json();
    const encryptedData = encrypt(JSON.stringify(body));

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/signin`, {
      method: "POST",
      headers: {
        'api_key': process.env.NEXT_PUBLIC_BACKEND_API_KEY,
      },
      body: encryptedData
    });

    const responseText = await response.text();
    const decryptedText = decrypt(responseText);
    const responseJson = JSON.parse(decryptedText);
    if (responseJson?.code == 1) {
      return Response.json(responseJson);
    }
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}