import { Response, Request, NextFunction} from 'express'

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {

  const defaultError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong, try again later',
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;