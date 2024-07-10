export const ErrorCodes = {
  AuthenticationFailure: 'authentication_failure',
  ValidationFailure: 'validation_failure',
  InvalidParameter: 'invalid_parameter',
  NotFound: 'not_found',
  Duplicate: 'duplicate',
  InternalError: 'internal_error',
  TokenError: 'token_error',
  UploadFileError: 'upload_file_error',
  UploadImageMapError: 'upload_imagemap_error',
  GetFileError: 'get_file_error',
  LineError: 'line_error',
  PasswordNotMatch: 'password_not_match',
  BadRequest: 'bad_request_error',
}

export const UploadImageExtensions = ['jpg', 'jpeg', 'png', 'gif']
export const AllowedImageMapExtensions = ['jpg', 'jpeg', 'png']

export const MessageType = {
  Text: 'text',
  Image: 'image',
  ImageMap: 'imagemap',
  Flex: 'flex',
}

export const LineApi = {
  IssueUrl: 'https://api.line.me/v2/oauth/accessToken',
  IssueType: 'client_credentials',
  WebhookEndpointUrl: 'https://api.line.me/v2/bot/channel/webhook/endpoint',
  ReplyUrl: 'https://api.line.me/v2/bot/message/reply',
  PushMsgUrl: 'https://api.line.me/v2/bot/message/push',
}
