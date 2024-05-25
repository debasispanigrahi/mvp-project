type Notice = {
    title: string,
    content: string,
    time: Date
    audio:Blob|null
}

type NoticeModel={
    title:string,
    content:string,
    time:Date
    audioSrc:string
}