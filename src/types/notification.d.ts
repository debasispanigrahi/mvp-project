type Notice = {
    title: string,
    content: string,
    time: Date
    audio:Blob|null,
    deviceId:string
}

type NoticeModel={
    _id?:string
    title:string,
    content:string,
    time:Date
    audioSrc:string|null
}