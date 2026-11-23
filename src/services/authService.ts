import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// This fallback secret is only for local development.
// A real application must use a strong secret stored securely as an environment variable.

//const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production';

// extended code to include refresh token secret
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET
  ?? 'dev-secret-change-in-production';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_SECRET
  ?? 'dev-refresh-secret-change-in-production';

  ///



// Simulated user store — replaced with database in Week 5
const users = [
  {
    id: 1,
    email: 'jordan@example.com',
    // Never store plain passwords — always store a hash
    passwordHash: bcrypt.hashSync('password123', 10),
    role: 'participant',
  },
];

export async function login(email: string, password: string) {
  const user = users.find(u => u.email === email);

  if (!user) {
    // Return the same error for wrong email and wrong password
    // This prevents attackers from knowing which one was wrong
    throw new Error('Invalid credentials');
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordValid) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT — payload contains non-sensitive user info only
  /*
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { token, userId: user.id, role: user.role };
  */

  // extended code to include refresh token secret
 const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { userId: user.id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
 
  return { accessToken, refreshToken, userId: user.id, role: user.role };

}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: number };
}
