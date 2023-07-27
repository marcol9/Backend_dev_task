export default class movie {
  private _id?: number;
  private _name: string;
  private _rating: number;
  private _country_id: number;
  private _genre_id: number;

  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get rating(): number {
    return this._rating;
  }
  public set rating(value: number) {
    this._rating = value;
  }
  public get country_id(): number {
    return this._country_id;
  }
  public set country_id(value: number) {
    this._country_id = value;
  }
  public get genre_id(): number {
    return this._genre_id;
  }
  public set genre_id(value: number) {
    this._genre_id = value;
  }

  constructor(name: string, rating: number, country_id: number, genre_id: number, id?: number) {
    this._id = id;
    this._name = name;
    this._rating = rating;
    this._country_id = country_id;
    this._genre_id = genre_id;
  }
}
