import React from "react";
import QRCodeSVG from "qrcode.react";
import LeaftyLogo from "@assets/LeaftyLogo.svg";

function QRGenerator(props) {
  const { value, documentId } = props;
  return (
    <div>
      <QRCodeSVG
        id={documentId}
        value={value}
        size={144}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"H"}
        includeMargin={true}
        imageSettings={{
          src: LeaftyLogo, // Remove the curly braces around LeaftyLogo
          height: 48,
          width: 48,
          excavate: false,
        }}
      />
    </div>
  );
}

export default QRGenerator;
