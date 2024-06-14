import React from "react";
import { Document, Page, Image, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "space-around",
    width: "100%",
    height: "100%"
  },
  qrImage: {
    width: "40%", // Adjust the width as needed
    height: "40%", // Adjust the height as needed
    margin: "5%" // Adjust the margin as needed
  }
});

function QRCodeDocument({ ids }) {
  const pages = [];

  for (let i = 0; i < ids.length; i += 4) {
    const pageIds = ids.slice(i, i + 4);

    pages.push(
      <Page key={`page_${i / 4 + 1}`} size="B8" style={styles.page}>
        {pageIds.map((id) => (
          <View key={id} style={styles.qrImage}>
            <Image
              allowDangerousPaths
              src={document.getElementById(id).toDataURL()}
            />
          </View>
        ))}
      </Page>
    );
  }

  return <Document>{pages}</Document>;
}

export default QRCodeDocument;
