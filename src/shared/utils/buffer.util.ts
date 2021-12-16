export class BufferUtil {
    static dataToBuffer(data: string) {
        return Buffer.from(data).toString('base64');
    }

    static buffertoData(buffer: string) {
        return Buffer.from(buffer, 'base64').toString();
    }
}
