import {InfoGraphicsResponse} from "./types";


const makeApiCall = async (url:string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            throw new Error(`Error fetching data: ${error}`);
        }
}

export const getInfoGraphics = async(page:number, pageSize: number): Promise<InfoGraphicsResponse>=>{
    return makeApiCall(`http://localhost:3307/albums/all?page=${page}&pageSize=${pageSize}`)
}

