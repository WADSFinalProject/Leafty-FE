import React from 'react';
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        padding: 30,
        lineHeight: 1.5,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 12,
    },
    section: {
        marginBottom: 10,
    },
    table: { 
        display: 'table', 
        width: 'auto', 
        borderStyle: 'solid', 
        borderWidth: 1,
        borderCollapse: 'collapse',
    },
    tableRow: { 
        flexDirection: 'row',
    },
    tableColHeader: { 
        width: '33%',
        borderStyle: 'solid', 
        borderWidth: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableCol: { 
        width: '33%',
        borderStyle: 'solid', 
        borderWidth: 1,
        textAlign: 'center',
    },
    tableCell: { 
        margin: 5,
    },
    signatureBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        borderTop: '1px solid black',
        paddingTop: 8,
    },
    signatureText: {
        width: '50%',
        textAlign: 'center',
    }
});

const PDFFile = ({ user, role, company, companyRole }) => {
    const userName = user?.Username ?? "User data not available";
    const userRole = role ?? "Role data not available";
    const companyName = company?.Username ?? "Company data not available";
    const companyPosition = companyRole ?? "Position data not available";

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>Acceptance Official Statement</Text>
                <Text>On this day Thursday, the 14th June, 2024. We, the undersigned below, are:</Text>
                <View style={styles.section}>
                    <Text>Name: {userName}</Text>
                    <Text>Position: {userRole}</Text>
                    <Text>Address/Region: Central Sulawesi</Text>
                    <Text>Who becomes the FIRST PARTY</Text>
                </View>
                <View style={styles.section}>
                    <Text>Name: {companyName}</Text>
                    <Text>Position: {companyPosition}</Text>
                    <Text>Address/Region:</Text>
                    <Text>Who becomes the SECOND PARTY</Text>
                </View>
                <View style={styles.section}>
                    <Text>The first party delivers the goods to the second party, and the second party claims to have received the goods from the first party in the form of:</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCell}>No.</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCell}>Type of Good</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCell}>Quantity</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>1</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Powder</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>5 Units</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text>Thus an official report of the acceptance of these merchandises was made by both sides in earnest. The goods handed over are in good condition since the official report of this event was signed. After this, the item becomes the responsibility of the second party to maintain, care for, and use properly.</Text>
                </View>
                <View style={styles.signatureBox}>
                    <Text style={styles.signatureText}>The Receiver</Text>
                    <Text style={styles.signatureText}>The Handover</Text>
                </View>
                <Text style={{ textAlign: 'center' }}>{userName}</Text>
            </Page>
        </Document>
    );
}

export default PDFFile;
