import React from "react";
import QRCodeSVG from "qrcode.react";
import LeaftyLogo from "@assets/LeaftyLogo.svg";

function QRGenerator(props) {
  const { value, documentId } = props;
  return (
      <QRCodeSVG
        id={documentId}
        value={value}
        size = {200}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"H"}
        includeMargin={false}
        imageSettings={{
          src: LeaftyLogo, // Remove the curly braces around LeaftyLogo
          height: 64,
          width: 64,
          excavate: false,
        }}
      />
  );
}

export default QRGenerator;
