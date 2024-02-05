import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Device } from "./types/device";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://agriculture-app.onrender.com/" }),
    reducerPath: "main",
    tagTypes: ["dev1", "dev2", "dev3"],

    endpoints: (build) => ({
        getDeviceOneData: build.query<Device[], string>({
            query: (deviceName: string) => ({
                url: `devices?deviceName=${deviceName}`,
                method: "GET",
            }),
            providesTags: (result, error, deviceName) => [
                { type: "dev1", id: deviceName || "all" }
            ]

        }),

    })

})
export const { useGetDeviceOneDataQuery
} = api
