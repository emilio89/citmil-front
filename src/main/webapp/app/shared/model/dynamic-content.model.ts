export interface IDynamicContent {
  id?: number
  title?: string
  description?: string
  urlImgContentType?: string
  urlImg?: any
  actived?: boolean
  companyId?: number
}

export class DynamicContent implements IDynamicContent {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public urlImgContentType?: string,
    public urlImg?: any,
    public actived?: boolean,
    public companyId?: number
  ) {
    this.actived = this.actived || false
  }
}
