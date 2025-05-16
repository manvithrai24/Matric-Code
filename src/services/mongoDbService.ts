
import { MongoClient, ServerApiVersion } from 'mongodb';
import { IssueType } from '@/components/Report';
import { toast } from 'sonner';

// MongoDB connection string - replace with your actual connection string
// This should ideally be an environment variable in production
const uri = "mongodb://localhost:27017";
const dbName = "matrix_code";

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export interface AnalysisResult {
  id?: string;
  code: string;
  score: number;
  issues: IssueType[];
  timestamp: Date;
}

/**
 * Connect to MongoDB
 */
async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    toast.error("Failed to connect to MongoDB. Using local analysis only.");
    throw error;
  }
}

/**
 * Save analysis result to MongoDB
 */
export async function saveAnalysisResult(analysis: AnalysisResult): Promise<string | null> {
  try {
    await connect();
    const db = client.db(dbName);
    const collection = db.collection("analyses");
    
    const result = await collection.insertOne({
      ...analysis,
      timestamp: new Date()
    });
    
    toast.success("Analysis saved to database");
    return result.insertedId.toString();
  } catch (error) {
    console.error("Error saving analysis:", error);
    toast.error("Failed to save analysis to database");
    return null;
  } finally {
    await client.close();
  }
}

/**
 * Get analysis history
 */
export async function getAnalysisHistory(): Promise<AnalysisResult[]> {
  try {
    await connect();
    const db = client.db(dbName);
    const collection = db.collection("analyses");
    
    const results = await collection.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();
    
    return results as unknown as AnalysisResult[];
  } catch (error) {
    console.error("Error fetching analysis history:", error);
    toast.error("Failed to fetch analysis history");
    return [];
  } finally {
    await client.close();
  }
}

/**
 * Get a single analysis by ID
 */
export async function getAnalysisById(id: string): Promise<AnalysisResult | null> {
  try {
    await connect();
    const db = client.db(dbName);
    const collection = db.collection("analyses");
    
    const result = await collection.findOne({ _id: id });
    return result as unknown as AnalysisResult;
  } catch (error) {
    console.error("Error fetching analysis:", error);
    toast.error("Failed to fetch analysis");
    return null;
  } finally {
    await client.close();
  }
}
