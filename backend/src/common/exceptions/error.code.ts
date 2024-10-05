export class ErrorCode {
  readonly status: number;
  readonly message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export type ErrorCodeType = ErrorCode;

// 에러 코드 정의
export const INVALID_CREDENTIALS = new ErrorCode(
  401,
  'The provided credentials are incorrect.',
);
export const USER_NOT_FOUND = new ErrorCode(
  404,
  'The requested user could not be found.',
);
export const EMAIL_ALREADY_VERIFIED = new ErrorCode(
  400,
  'This email address has already been verified.',
);
export const PASSWORD_ALREADY_EXISTS = new ErrorCode(
  400,
  'A password already exists for this user. Registration is not allowed.',
);
export const VERIFICATION_CODE_STILL_VALID = new ErrorCode(
  400,
  'A verification code is still valid. Please wait before requesting a new one.',
);
export const EMAIL_NOT_VERIFIED = new ErrorCode(
  400,
  'This email address has not been verified. Password reset is not allowed.',
);
export const NO_PASSWORD_EXISTS = new ErrorCode(
  400,
  'No password is set for this user. Password reset is not allowed.',
);
export const PASSWORDS_DO_NOT_MATCH = new ErrorCode(
  400,
  'The passwords provided do not match.',
);
export const VERIFICATION_CODE_INVALID = new ErrorCode(
  400,
  'The verification code is either invalid or has expired.',
);
export const INTERNAL_SERVER_ERROR = new ErrorCode(
  500,
  'An unexpected server error occurred. Please try again later.',
);
export const INSUFFICIENT_CREDITS = new ErrorCode(
  400,
  'Insufficient credits to perform this operation',
);
export const MODEL_NOT_FOUND = new ErrorCode(
  404,
  'The requested model could not be found.',
);
export const FORBIDDEN_ACTION = new ErrorCode(
  403,
  'You do not have permission to perform this action.',
);

export const ACCOUNT_NOT_ACTIVE = new ErrorCode(
  400,
  'Your account is not active. Please contact support.',
);
export const MODEL_NOT_BELONG_TO_USER = new ErrorCode(
  403,
  'The specified model does not belong to the user.',
);
