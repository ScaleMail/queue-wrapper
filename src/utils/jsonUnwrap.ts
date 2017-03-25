export default class JSONCheck {
  static unwrap(raw : string) {
    try {
      const parsed = JSON.parse(raw);

      return parsed;
    } catch (e) {
      return raw;
    }
  }
}