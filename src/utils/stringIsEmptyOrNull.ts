export default function stringIsEmptyOrNull(data?: string) {
  return !data || data?.replace(/\s/g, '').length === 0
}
