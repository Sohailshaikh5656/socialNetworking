import { encrypt, decrypt } from "@/app/assets/encription";
export async function POST(request) {
    try {
        console.log("Data in API calling:", request)
        
        const reqBody = await request.json(); // ✅ correctly parse request body
        reqBody.role = "User";
        console.log(reqBody)
        const encryptedData = encrypt(JSON.stringify(reqBody));
        console.log("Encrypted Data:", encryptedData)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/signup`, {
            headers: {
                'api_key': process.env.NEXT_PUBLIC_BACKEND_API_KEY,
            }, 
            method: "POST",
            body: encryptedData
        });

        let responseText = await response.text();
        let decryptedText = decrypt(responseText);
        let responseJson = JSON.parse(decryptedText);
        console.log("Response From Api : ",responseJson)
        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (responseJson?.code == 1) {
            return Response.json(responseJson);
        }

        return Response.json({ message: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
