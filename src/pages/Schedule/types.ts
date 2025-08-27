export enum WeekType {
    ODD = 0,
    EVEN = 1
}

export interface Lecture {
    weekType: string,
    time: string,
    name: string,
    type: string,
    lecturer: string,
    classroom: string
}