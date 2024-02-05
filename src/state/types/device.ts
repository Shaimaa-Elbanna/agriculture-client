export interface Device {
    _id:        string;
    deviceName: string;
    fieldId:    FieldID;
    __v:        number;
    topics:     Topic[];
}

export interface FieldID {
    _id:       string;
    fieldName: string;
}

export interface Topic {
    data: DeviceTopics[];
    _id:  string;
}

export interface DeviceTopics {
    T:    number;
    S:    number;
    H:   number;
    PH:   number;
    PHO:   number;
    PT:   number;
    N:   number;
    time: Date;
}
