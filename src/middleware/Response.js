import { NextResponse } from "next/server"


export const ResponseSuccess = (statusCode,message,data) =>{
    return NextResponse.json({
        success:true,
        message,data
    },{
        status:statusCode
    })
}
export const ResponseFailed = (statusCode,message,data) =>{
    return NextResponse.json({
        success:false,
        message,data
    },{
        status:statusCode
    })
}

export const ResponseFailedError = (status, message, error) => {
    return NextResponse.json({success:false, message, error }, { status });
}