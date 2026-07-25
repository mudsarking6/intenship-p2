import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config({path:"atlas-credentials.env"});
const {connectToMongoDB,closeMongoDBConnection}=await import("../db/mongodb.mjs");
const accounts=[
 {role:"super_admin",username:process.env.SUPER_ADMIN_USERNAME,email:process.env.SUPER_ADMIN_EMAIL,password:process.env.SUPER_ADMIN_PASSWORD,name:process.env.SUPER_ADMIN_NAME||"Super Administrator"},
 {role:"space_admin",username:process.env.SPACE_ADMIN_USERNAME,email:process.env.SPACE_ADMIN_EMAIL,password:process.env.SPACE_ADMIN_PASSWORD,name:process.env.SPACE_ADMIN_NAME||"Space Administrator"}
];
if(accounts.some(x=>!x.username||!x.email||!x.password)){console.error("Admin environment variables are incomplete. See atlas-credentials.env.example.");process.exit(1)}
const organization=process.env.DEFAULT_ORGANIZATION||"Zeppelin Labs";
const db=await connectToMongoDB(),users=db.collection("users");await users.createIndex({email:1},{unique:true});await users.createIndex({username:1},{unique:true,sparse:true});
for(const account of accounts){const now=new Date();await users.updateOne({role:account.role,organization},{$set:{username:account.username.toLowerCase(),email:account.email.toLowerCase(),name:account.name,passwordHash:await bcrypt.hash(account.password,12),organization,role:account.role,status:"active",updatedAt:now},$setOnInsert:{createdAt:now}},{upsert:true});console.log(`${account.role} account is ready.`)}
await closeMongoDBConnection();
