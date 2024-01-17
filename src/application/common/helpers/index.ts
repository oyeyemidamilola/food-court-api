// export const groupBy = <T, K  extends keyof T>(data: T[], key: K ): Record<string, T> => {
//     let dictionary = Object.assign({}, ...data.map((x: any) => ({ [x[key.toString()]]: x }))) as Record<string, T>
//     return dictionary
// }