export default class JSONTool {
  static unwrap(raw : string) {
    try {
      const parsed = JSON.parse(raw);

      return parsed;
    } catch (e) {
      return raw;
    }
  }

  static wrap(raw : string | Object) {
    if (typeof raw === 'object') {
      return JSON.stringify(raw);
    }

    return raw;
  }
}