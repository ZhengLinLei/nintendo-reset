interface CRC {
    generate(): void;
    crc32(data: string, crc?: number): number;
}
export interface __CRC32 extends CRC {
    crc: number;
    get getTable(): Array<number>;
}
// Path: typescript/libs/__heritage.ts


export interface __main {
    serial_number : string;
    date_device : string;
    master_key : number;
    crc32 : any;
    alphabet : RegExp;

    get getMasterKey() : number;
    calculate() : number;
}