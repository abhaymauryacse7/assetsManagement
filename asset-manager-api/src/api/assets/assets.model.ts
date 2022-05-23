export interface IAsset {
    id: number,
    type: string,
    serial: string,
    color: string,
    is_active: boolean,
    meta_data_hash: string
}

export interface IGetAssetReq {
    params: {id: number}
}

export interface IAddAssetReq {
    body: IAsset
}

export interface IUpdateAssetReq {
    params: {id: number},
    body: IAsset
}

export interface IUpdateAsset {
    type: string,
    color: string,
    serial: string,
    meta_data_hash: string,
    id: number
}

export interface IDeleteAssetReq {
    params: {id: number}
}
