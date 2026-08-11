import React, { useState } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Productimg = ({ images }) => {
    const [mainImg, setMainImg] = useState(images?.[0]?.url || "")
    return (
        <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-5 w-full">
            <div className="flex sm:flex-col gap-3 sm:gap-5 overflow-x-auto sm:overflow-visible">
                {
                    images?.length > 0 &&
                    images.map((img, index) => (
                        <img
                            key={index}
                            src={img.url}
                            onClick={() => setMainImg(img.url)}
                            className="cursor-pointer w-16 h-16 sm:w-20 sm:h-20 shrink-0 border shadow-lg"
                        />
                    ))

                }
            </div>
            <Zoom>
                <img src={mainImg || "/siddharthaphoto3.jpg"} alt="" className="w-full max-w-[500px] mx-auto sm:mx-0 border shadow-lg" />
            </Zoom>
        </div>
    )
}
export default Productimg;