import { clientPromise, dbName } from './client';
import { Profile, UserRole } from './models';
import { ObjectId } from 'mongodb';

export class Auth {
  static async signUp(email: string, password: string, userData?: Partial<Profile>) {
    try {
      const db = (await clientPromise).db(dbName);
      
      // Check if user already exists
      const existingUser = await db.collection<Profile>('profiles').findOne({ email });
      if (existingUser) {
        return { error: 'User already exists' };
      }

      // Create user profile
      const now = new Date();
      const result = await db.collection<Profile>('profiles').insertOne({
        email,
        ...userData,
        created_at: now,
        updated_at: now
      });

      // Create user role (default to customer)
      await db.collection<UserRole>('user_roles').insertOne({
        user_id: result.insertedId.toString(),
        role: 'customer',
        created_at: now
      });

      return { user: { id: result.insertedId.toString(), email } };
    } catch (error) {
      return { error: 'Failed to create user' };
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const db = (await clientPromise).db(dbName);
      const user = await db.collection<Profile>('profiles').findOne({ email });
      
      if (!user) {
        return { error: 'User not found' };
      }

      // In a real app, you'd verify the password hash here
      return { user: { id: user._id?.toString(), email: user.email } };
    } catch (error) {
      return { error: 'Failed to sign in' };
    }
  }

  static async getUser(userId: string) {
    try {
      const db = (await clientPromise).db(dbName);
      const user = await db.collection<Profile>('profiles').findOne({ _id: new ObjectId(userId) });
      
      if (!user) {
        return { user: null };
      }

      return { user: { id: user._id?.toString(), email: user.email } };
    } catch (error) {
      return { user: null };
    }
  }

  static async signOut() {
    // In a real app, you'd handle token invalidation here
    return { error: null };
  }
}