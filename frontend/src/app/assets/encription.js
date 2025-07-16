import crypto from "crypto";

const SECRET_KEY = "xza548sa3vcr641b5ng5nhy9mlo64r6k";
const IV_STRING = "5ng5nhy9mlo64r6k";

const key = crypto.createHash('sha256').update(SECRET_KEY).digest();
const iv = Buffer.from(IV_STRING);

// Encrypt function
export function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decrypt function
export function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
