export default interface IGame {
  ID: string,
  Name: IItemName,
  CategoryID: string[],
  ImageFullPath: string,
  MerchantID: string,
  isFav?: boolean
}
