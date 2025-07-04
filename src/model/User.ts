import mongoose ,{Schema, Document} from "mongoose"


export interface Message extends Document{
    _id: string;
    content:string;
    createdAt:Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        required:true,
        default:Date.now()
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    // verifyCode:string;
    isVerified:boolean;
    // verifyCodeExpiry: Date;
    isAcceptingMessages:boolean;
    messages:Message[];
}

const UserSchema: Schema<User> = new Schema({
    username:{
        required:[true,"Username is required"],
        type:String,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/^\S+@\S+\.\S+$/,"invalid email"]
    },
    password:{
        type:String,
        required:[true,"Email is required"],
    },
    // verifyCode:{
    //     type:String,
    //     required:[true,"verify code is required"],
    // },
    // verifyCodeExpiry:{
    //     type:Date,
    //     required:[true,"verify code expiry is required"],
    // },
    isVerified:{
        type:Boolean,
        default:true
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true
    },
    messages:{
        type:[MessageSchema]
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))
export default UserModel