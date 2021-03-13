import * as E from "fp-ts/lib/Either";

export const validateIpAddress = (ipAddress: string): E.Either<false, string> =>
  /(^25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    ipAddress
  )
    ? E.right(ipAddress)
    : E.left(false);
