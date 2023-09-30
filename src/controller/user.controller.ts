import { Request, Response } from "express";
import logger from '../utils/logger';
import { createuser } from "../service/user.service";
import { CreatUserInput } from "../schema/user.schema";
import { omit} from "lodash";

export const createUserHandler =  async (req: Request<{},{},CreatUserInput['body']> ,  res: Response) => {
  try {
    const user = await createuser(req.body);
    return res.status(201).send(omit(user.toJSON(), "password"));
  } catch (error : any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};