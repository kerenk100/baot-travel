export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public dateOfBirth: string,
    public address: string,
    public city: string,
    public state: string,
    public country: string,
    public hash?: string,
    public salt?: string
  ) {}
}