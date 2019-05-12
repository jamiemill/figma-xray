import React, {useEffect} from 'react';

import {FileInfo} from "./Form";

function Report({fileInfo}:{fileInfo:FileInfo}) {

    const fileInfoCacheKey = fileInfo && (fileInfo.fileURL + fileInfo.personalToken);

    useEffect(() => {
        console.log("fetching...", fileInfo);
    }, [fileInfoCacheKey])

    return <div>Report Here</div>;
}

export default Report;