import Codeblock from '../models/Codeblock.js'
import {Request, Response} from 'express'
import { UnAuthenticatedError } from '../errors/index.js'

export const getAllBlocks = async (req: Request, res: Response) => {
    try {
        const blocks = await Codeblock.find();
        res.status(200).send(blocks);
    } catch (error) {
        res.status(500).json({msg: error.msg})
    }
}

export const validateCodeBlock = async (req: Request, res: Response) => {
const {codeblockId} = req.body;
  const codeblock = await Codeblock.findById(codeblockId);

  if (!codeblock) {
    throw new UnAuthenticatedError('Invalid codeblock id');
  }

  res.status(200).json({isValidCodeblock: true, codeblock});
}

