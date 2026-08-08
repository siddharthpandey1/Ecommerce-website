import React, { useState } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Productimg = ({ images }) => {
    const [mainImg, setMainImg] = useState(images?.[0]?.url || "")
    return (
        <div className="flex gap-5 w-max">
            <div className="gap-5 flex flex-col">
                {
                    images?.length > 0 &&
                    images.map((img, index) => (
                        <img
                            key={index}
                            src={img.url}
                            onClick={() => setMainImg(img.url)}
                            className="cursor-pointer w-20 h-20 border shadow-lg"
                        />
                    ))

                }
            </div>
            <Zoom>
                <img src={mainImg || "/siddharthaphoto3.jpg"} alt="" className="w-[500px] border shadow-lg" />
            </Zoom>
        </div>
    )
}
export default Productimg; 