export class Token {
    token: string;
    expiresIn: number;
    constructor(token: string, expiresIn: number) {
      this.token = token;
      this.expiresIn = expiresIn;
    }
  }