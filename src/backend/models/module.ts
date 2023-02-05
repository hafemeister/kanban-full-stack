export const makeTypedModelFieldNames = <T>(...args: (keyof T)[]) => new Array(...args)
