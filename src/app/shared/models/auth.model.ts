interface RegisterForm {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  city: string;
  email: string;
  gender: string;
  phone?: string;
  _id?: string;
  logo?:string;
  updatedAt?:string;
  createdAt?:string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface DeleteResponse {
  success?: boolean,
  message?:string,
  error?: boolean,
  _id?:string
}

interface User extends RegisterForm{
}

interface Users{
   data: RegisterForm,
   count:number,
}

export { RegisterForm, LoginForm,User,DeleteResponse,Users };
