export default function asyncHandler(fn: any) {
  return (...args: any[]) => fn(...args).catch(args[args.length - 1])
}
