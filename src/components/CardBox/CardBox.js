import React from 'react';
import './CardBox.css'; 
const CardBox = ({ title, titleAlign, opacity, children, width }) => {
    return (
        <div className="cardBox" style={{background: `rgba(222, 229, 229, ${(opacity || 1)})`, width: `${(width || 100)}%`}}>
            <div className="d-flex flex-column">
                <div className={`d-flex justify-content-${(titleAlign || "center")} ${(titleAlign === "start") ? "pl-3" : ""} align-items-center title`}>
                    {title}
                </div>
                {children}
            </div>
        </div>
    )
}
export default CardBox;