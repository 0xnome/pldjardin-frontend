export class NameListService {
  names = [
    'Carottes',
    'Navets'
  ];

  get(): string[] {
    return this.names;
  }
  add(value: string): void {
    this.names.push(value);
  }
}
