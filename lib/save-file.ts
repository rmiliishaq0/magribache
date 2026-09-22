import path from "path"
import fs from "fs/promises";

export async function uploadFile(file:File,type:string){
    const  bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes) 

    const extention = file.name.split(".").pop() || "png" 

    const fileName = `${type}.${extention}`

    const directory = path.join(process.cwd(),"public/uploads")

    await fs.mkdir(directory,{recursive:true})

    await fs.writeFile(path.join(directory,fileName),buffer)

    return `uploads/${fileName}`
}