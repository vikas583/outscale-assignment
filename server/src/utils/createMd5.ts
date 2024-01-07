import crypto from 'crypto';

export const createMd5 = (text: string, timeSensitive = true) =>
  crypto
    .createHash('md5')
    .update(`${text}${timeSensitive ? new Date().getTime() : ''}`)
    .digest('hex');
