export interface authtype{
    sub: string,
    name:string, 
    email:string, 
    picture:string
}

export interface usertype{
    "_id":string,
    "name":string,
    "email":string,
    "picture":string
}

export interface IUser extends Document {
    googleId?: string;   
    name: string;
    email: string;
    password?: string; 
    picture?: string;
    loginMethod: 'google' | 'local';
  }