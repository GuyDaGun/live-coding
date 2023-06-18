export interface CodeBlockType {
    _id: string,
    title: string,
    code: string,
    solution?: string,
}

export interface UserType {
    _id: string,
    username: string,
    password: string,
    isMentor: boolean
}

export type ParamsType = {
  studentId: string,
  codeblockId: string,
}

export interface AppTypeInitialState {
  userLoading: boolean;
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: UserType | null;
  codeblocks: CodeBlockType[];
  students: UserType[];
  params: ParamsType;
}
