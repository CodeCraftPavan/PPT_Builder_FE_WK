export function getEnumValues(enumObj: any): string[] {
    return Object.keys(enumObj).map(key => enumObj[key]);
  }
  