export interface IPayloadGenerateToken {
  user: {
    id: string;
    roles?: {
      name: string;
      permissions?: {
        name: string;
      }[];
    }[];
  };
}
