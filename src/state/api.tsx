import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Device } from "./types/device";
import { TopicsData } from "./types/topics";
// https://agriculture-app.onrender.com/

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://agriculture-app.onrender.com/" }),
    reducerPath: "main",
    tagTypes: ["device", 'topic'],

    endpoints: (build) => ({
        getDeviceOneData: build.query<Device[], string>({
            query: (deviceName: string) => ({
                url: `devices?deviceName=${deviceName}`,
                method: "GET",
            }),
            providesTags: (_result, _error, deviceName) => [
                { type: "device", id: deviceName || "all" }
            ]

        }),
        getRequiredDataWithStartTimeOfAnyDevice: build.query<TopicsData[], [string, string, string]>({
            query: ([deviceId, startTime, endTime]: [string, string, string]) => ({
                url: endTime ? `topics?deviceId=${deviceId}&startTime=${startTime}&endTime=${endTime}` : `topics?deviceId=${deviceId}&startTime=${startTime}`,
                method: "GET"
            }),
            providesTags: (_result, _error, [deviceId, startTime, endDate]) => [
                { type: "topic", id: deviceId + startTime + endDate || "all" }
            ]
        })

    })

})
export const { useGetDeviceOneDataQuery, useGetRequiredDataWithStartTimeOfAnyDeviceQuery
} = api
