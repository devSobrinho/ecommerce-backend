declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      roles?: IRole[];
    };
  }
}

interface IRole {
  name: string;
  permissions?: IPermission[];
}

interface IPermission {
  name: string;
}
