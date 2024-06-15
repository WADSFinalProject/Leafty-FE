import React from "react";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
  },
});

const Table = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <ItemsTable data={data} />
    </Page>
  </Document>
);

export default Table;