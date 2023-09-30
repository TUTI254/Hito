import UserModel, {UserInput} from "../models/user.model";

export  const createuser = async (input: UserInput  ) => {
    try {
        return await UserModel.create(input);
    } catch (error: any) {
        throw new Error(error);
    }
}